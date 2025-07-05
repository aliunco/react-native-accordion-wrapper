import React from 'react';
import { FlatList, TextStyle, ViewStyle } from 'react-native';
import AccordionItem from './AccordionItem';

type DataSourceItem = { 
    title: string; 
    child?: React.ReactNode; 
    nonExpandable?: boolean; 
    onPress?: () => void 
}

export type AccordionProps = {
    useFlatList?: boolean; // use flatlist
    dataSource: DataSourceItem[];
    headerItemsStyle?: ViewStyle;
    itemWrapperStyle?: ViewStyle;
    rightChevronIcon?: JSX.Element;
    initialActiveIndex?: number;
    headerTitleLabelStyle?: TextStyle;
    shouldSelectOneItemAtATime?: boolean;
    listHeaderComponent?: React.ReactElement;
};

const Accordion = ({
    dataSource,
    useFlatList = false,
    rightChevronIcon,
    itemWrapperStyle,
    headerItemsStyle,
    initialActiveIndex,
    listHeaderComponent,
    headerTitleLabelStyle,
    shouldSelectOneItemAtATime = true,
}: AccordionProps) => {
      const [activeIndex, setActiveIndex] = React.useState<number | undefined>(
        initialActiveIndex,
      );

      React.useEffect(() => {
        if (activeIndex !== initialActiveIndex) {
          setActiveIndex(initialActiveIndex)
        }
      }, [initialActiveIndex])
    
      const renderAccordionItem = ({
        item,
        index,
      }: {
        item: DataSourceItem;
        index: number;
      }) => {
        let initialForceExpandedState = initialActiveIndex === index
        if (shouldSelectOneItemAtATime) {
          initialForceExpandedState = index === activeIndex;
        }

        return (
          <AccordionItem
            title={item.title}
            itemWrapperStyle={itemWrapperStyle}
            isExpandable={!item.nonExpandable}
            titleStyle={headerTitleLabelStyle}
            rightChevronIcon={rightChevronIcon}
            initialExpandedState={initialForceExpandedState}
            key={`${item.title}-${index}`}
            headerStyle={headerItemsStyle}
            onPress={item.onPress}
            onExpandStateChange={(isExpanded) => {
              if (isExpanded) {
                setActiveIndex(index);
              }
            }}
          >
            {item.child}
          </AccordionItem>
        );
      };

    return useFlatList ? (
        <FlatList
            data={dataSource}
            showsHorizontalScrollIndicator={false}
            ListHeaderComponent={listHeaderComponent}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={false}
            horizontal={false}
            keyExtractor={(item, index) => `${item.title}-${index}`}
            renderItem={renderAccordionItem}
        />
    ) : (
        <>
            {listHeaderComponent}
            {dataSource.map((item, index) => {
                return renderAccordionItem({ item, index });
            })}
        </>
    );
};

export default Accordion;