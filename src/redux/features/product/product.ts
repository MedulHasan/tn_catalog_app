import { ProductType } from '../../../utils/types';
import { apiSlice } from '../api/apiSlice';

interface ResponseType {
  products: ProductType[];
  total: number;
  skip: number;
  limit: number;
}

interface Params {
  limit: number;
  skip: number;
}

export const productApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getProducts: builder.query<ResponseType, Params>({
      query: ({ limit, skip }) => ({
        url: `/products?limit=${limit}&skip=${skip}&select=id,thumbnail,title,price`,
      }),
    }),
  }),
});

export const { useGetProductsQuery } = productApi;
