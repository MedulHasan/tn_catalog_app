import {ProductType} from '../../../utils/types';
import {apiSlice} from '../api/apiSlice';

export interface ResponseType {
  products: ProductType[];
  total: number;
  skip: number;
  limit: number;
}

interface Params {
  limit: number;
  skip: number;
}

interface DetailsParams {
  id: number;
}

export const productApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getProducts: builder.query<ResponseType, Params>({
      query: ({limit, skip}) => ({
        url: `/products?limit=${limit}&skip=${skip}&select=id,thumbnail,title,price,description`,
      }),
    }),
    getProductDetails: builder.query<ProductType, DetailsParams>({
      query: ({id}) => ({
        url: `/products/${id}?select=id,thumbnail,title,price,description`,
      }),
    }),
  }),
});

export const {useGetProductsQuery, useGetProductDetailsQuery} = productApi;
