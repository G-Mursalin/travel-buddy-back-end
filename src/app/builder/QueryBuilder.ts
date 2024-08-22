import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
    public modelQuery: Query<T[], T>;
    public query: Record<string, unknown>;

    constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
        this.modelQuery = modelQuery;
        this.query = query;
    }

    // Searching
    search(searchableFields: string[]) {
        const searchTerm = this?.query?.searchTerm;
        if (searchTerm) {
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map(
                    (field) =>
                        ({
                            [field]: { $regex: searchTerm, $options: 'i' },
                        }) as FilterQuery<T>,
                ),
            });
        }

        return this;
    }

    // Filter data by exact match
    filter() {
        const queryObj = { ...this.query }; // copy of real query object

        const excludeFields = [
            'searchTerm',
            'sort',
            'limit',
            'page',
            'fields',
            'minPrice',
            'maxPrice',
        ];

        excludeFields.forEach((el) => delete queryObj[el]);

        this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);

        return this;
    }

    // Filter by minimum price
    minPrice() {
        const minPrice = this.query.minPrice;
        if (minPrice) {
            this.modelQuery = this.modelQuery.find({
                budget: { $gte: Number(minPrice) },
            } as FilterQuery<T>);
        }
        return this;
    }

    // Filter by maximum price
    maxPrice() {
        const maxPrice = this.query.maxPrice;
        if (maxPrice) {
            this.modelQuery = this.modelQuery.find({
                budget: { $lte: Number(maxPrice) },
            } as FilterQuery<T>);
        }
        return this;
    }

    // Sorting
    sort() {
        if (this?.query?.sort) {
            const sort = (this?.query?.sort as string)?.split(',')?.join(' ');
            this.modelQuery = this.modelQuery.sort(sort as string);
        } else {
            this.modelQuery = this.modelQuery.sort('-createdAt');
        }

        return this;
    }

    // Select data basted on page and limit number
    paginate() {
        const page = Number(this?.query?.page) || 1;
        const limit = Number(this?.query?.limit) || 8;
        const skip = (page - 1) * limit;

        this.modelQuery = this.modelQuery.skip(skip).limit(limit);

        return this;
    }

    // Select only selected fields
    fields() {
        if (this?.query?.fields) {
            const fields = (this?.query?.fields as string)
                ?.split(',')
                ?.join(' ');

            this.modelQuery = this.modelQuery.select(fields);
        } else {
            this.modelQuery = this.modelQuery.select('-__v');
        }
        return this;
    }

    // Meta data for frontend pagination
    async countTotal() {
        const totalQueries = this.modelQuery.getFilter();
        const total = await this.modelQuery.model.countDocuments(totalQueries);
        const page = Number(this?.query?.page) || 1;
        const limit = Number(this?.query?.limit) || 8;
        const totalPage = Math.ceil(total / limit);

        return {
            page,
            limit,
            total,
            totalPage,
        };
    }
}

export default QueryBuilder;
