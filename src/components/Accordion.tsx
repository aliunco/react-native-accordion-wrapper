import React from 'react';
import { FlatList, TextStyle, ViewStyle } from 'react-native';
import AccordionItem from './AccordionItem';

type DataSourceItem = { title: string; child: React.ReactNode };

export type AccordionProps = {
    useFlatList?: boolean; // use flatlist
    dataSource: DataSourceItem[];
    headerItemsStyle?: ViewStyle;
    rightChevronIcon?: JSX.Element;
    headerTitleLabelStyle?: TextStyle;
    shouldSelectOneItemAtATime?: boolean;
    listHeaderComponent?: React.ReactElement;
};

const Accordion = ({
    dataSource,
    useFlatList = false,
    rightChevronIcon,
    headerItemsStyle,
    listHeaderComponent,
    headerTitleLabelStyle,
    shouldSelectOneItemAtATime = true,
}: AccordionProps) => {
    const [activeIndex, setActiveIndex] = React.useState<number>();

    const renderAccordionItem = ({
        item,
        index,
    }: {
        item: DataSourceItem;
        index: number;
    }) => {
        return (
            <AccordionItem
                title={item.title}
                titleStyle={headerTitleLabelStyle}
                rightChevronIcon={rightChevronIcon}
                key={`${item.title}-${index}`}
                headerStyle={headerItemsStyle}
                onExpandStateChange={(isExpanded) => {
                    isExpanded && setActiveIndex(index);
                }}
                shouldCollapse={shouldSelectOneItemAtATime ? index !== activeIndex : false}
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