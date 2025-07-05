import { View } from 'react-native';
import React from 'react';
import { makeStyles } from '../../hooks/makeStyle';
import { FlashList } from '@shopify/flash-list';
import { useAppSelector } from '../../redux/store';
import Product from '../home/Product';
import ItemSeparetor from '../../components/ItemSeparetor';
import EmptyContent from '../../components/EmptyContent';

const Favourites = () => {
  const favouriteItems = useAppSelector(state => state.products.favouriteItems);
  const styles = useStyle();
  return (
    <View style={styles.cont}>
      <FlashList
        data={favouriteItems}
        renderItem={({ item, index }) => (
          <Product
            item={item}
            isLastIndex={favouriteItems.length - 1 === index}
          />
        )}
        keyExtractor={(_, i) => i.toString()}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={ItemSeparetor}
        estimatedItemSize={109}
        ListEmptyComponent={() => (
          <EmptyContent title="Your Favourite list is Empty!" />
        )}
      />
    </View>
  );
};

export default Favourites;

const useStyle = makeStyles(theme => ({
  cont: {
    flex: 1,
    backgroundColor: theme.white,
    paddingHorizontal: 20,
  },
}));
