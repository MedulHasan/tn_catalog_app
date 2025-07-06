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

const Home = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [skip, setSkip] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const limit = 20;
  const {isLoading, data, isSuccess} = useGetProductsQuery({
    limit,
    skip,
  });

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

  const styles = useStyle();

  let content;
  if (isLoading) {
    content = <LoadingModal isVisible={isLoading} />;
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
        ListFooterComponent={() => <Footer isLoadingMore={isLoadingMore} />}
        ListFooterComponentStyle={{marginBottom: 20}}
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
