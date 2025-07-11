/* eslint-disable react/no-unstable-nested-components */
import {ActivityIndicator, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {makeStyles} from '../../hooks/makeStyle';
import {useGetProductsQuery} from '../../redux/features/product/product';
import LoadingModal from '../../components/LoadingModal';
import {FlashList} from '@shopify/flash-list';
import Product from './Product';
import {ProductType} from '../../utils/types';
import ItemSeparetor from '../../components/ItemSeparetor';
import FloatingTimestamp from '../../components/FloatingTimestamp';
import EmptyContent from '../../components/EmptyContent';

const Home = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [skip, setSkip] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const limit = 20;
  const {isLoading, data, isSuccess, isError, refetch, isFetching} =
    useGetProductsQuery({
      limit,
      skip,
    });
  console.log({isFetching, skip});

  useEffect(() => {
    if (isSuccess && data?.products) {
      if (skip === 0) {
        setProducts(data.products);
      } else {
        setProducts(prev => [...prev, ...data.products]);
        setIsLoadingMore(false);
      }
    }
  }, [data, isSuccess, skip]);

  const handleLoadMore = useCallback(() => {
    if (data && products.length < data.total && !isLoadingMore) {
      setIsLoadingMore(true);
      setSkip(prev => prev + limit);
    }
  }, [data, products, isLoadingMore]);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    setSkip(0);
    try {
      await refetch();
    } finally {
      setRefreshing(false);
    }
  }, [refetch]);

  const styles = useStyle();

  let content;
  if (isLoading && !refreshing) {
    content = <LoadingModal isVisible={isLoading} />;
  }
  if (!isLoading && isError) {
    return (
      <EmptyContent
        title="Something went wrong, please refresh you app!"
        style={{paddingHorizontal: 20}}
      />
    );
  }
  if (!isLoading && isSuccess) {
    content = (
      <FlashList
        data={products}
        renderItem={({item, index}) => (
          <Product item={item} isLastIndex={products.length - 1 === index} />
        )}
        keyExtractor={(_, i) => i.toString()}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={ItemSeparetor}
        estimatedItemSize={109}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        ListFooterComponent={() => <Footer isLoadingMore={isLoadingMore} />}
        ListFooterComponentStyle={{marginBottom: 20}}
        ListEmptyComponent={() => (
          <EmptyContent title="No product available!" />
        )}
      />
    );
  }
  return (
    <View style={styles.cont}>
      <FloatingTimestamp />
      {content}
    </View>
  );
};

export default Home;

interface FooterProps {
  isLoadingMore: boolean;
}
const Footer: React.FC<FooterProps> = ({isLoadingMore}) => {
  const styles = useStyle();
  return (
    <View style={styles.footer}>
      {isLoadingMore ? <ActivityIndicator size="large" /> : null}
    </View>
  );
};

interface PropsStyle {
  isLoadingMore?: boolean;
}

const useStyle = makeStyles((theme, props: PropsStyle) => ({
  cont: {
    flex: 1,
    backgroundColor: theme.white,
    paddingHorizontal: 20,
  },
  footer: {
    height: props.isLoadingMore ? 80 : 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
