
# React Native Accordion Wrapper

 An 🪗 accordion component for react native written in [TypeScript](https://www.typescriptlang.org/) in order to handle the accordion behavior for any react native components.


## Installing

For the latest stable version:

using npm:
```bash
npm install --save react-native-accordion-wrapper
```

using yarn:
```bash
yarn add react-native-accordion-wrapper
```

## Usage

```tsx
import React, { Component } from 'react';
import Accordion from 'react-native-accordion-wrapper';

const Example = () => {

    return (
      <Accordion
        shouldSelectOneItemAtATime
        headerItemsStyle={{
          backgroundColor: '#dedede',
          borderBottomColor: '#000000',
        }}
        dataSource={[{
            title: 'first title',
            child: <View><Text>This is the child view</Text></View>
        }, {
            title: 'second title',
            child: <View><Text>This is the child view</Text></View>
        }]}/>
    );
}
```

## `AccordionItem`

The `Accordion` component is a wrapper of another component named `AccordionItem` which has a tappable header with a child view on the bottom of it. Whenever the header is tapped so the visibility of child view is getting toggled. it's very handy if you don't need an accordion but you need this behavior.

```tsx
import React, { Component } from 'react';
import { AccordionItem } from 'react-native-accordion-wrapper';

const Example = () => {

    return (
      <AccordionItem title="Tap me!">
        {/** any react native component */}
      </AccordionItem>
    );
}
```


## Documentation

here is the properties and the descriptions of it: 


### Accordion component properties

| Props Name | Type | Default | Description |
| :--: | :----- | :--: | :------------------------- |
| dataSource | `DataSourceItem[]` | **required input** | The datasource is an array of objects containing `title` (which can also be called header) and `child`; `title` is `string` and `child` is any `JSX.Element` |
| useFlatList | `boolean` | false | if the component is not inside another scrollview, you can use this feature to enhance the performance by sending `true` |
| headerItemsStyle | `ViewStyle` | `undefined` | You can change the header items style (e.g. change backgroundColor of it) |
| rightChevronIcon | JSX.Element | undefined | if you pass a chevron element, it would point at bottom when it's collapsed and point to top when it's opened. (please notice that you should provide a chevron which points to the right) |
| headerTitleLabelStyle | `TextStyle` | undefined | you can change the text style of the header items | 
| shouldSelectOneItemAtATime | `boolean` | true | if only one item must be opened at a time, set it as `true`, and if all of the accordion items can be opened independentely, set it as `true` |
| listHeaderComponent | React.ReactElement | `undefined` | it would be useful whenever you set the `useFlatList` to be `true`, so it's just like the `ListHeaderComponent` of `FlatList`|

### AccordionItem component properties

| Props Name | Type | Default | Description |
| :--: | :----- | :--: | :------------------------- |
| title | `string` | **required input** | The title which would be tapped in order to expande or collapse the `child` view |
| titleStyle | `TextStyle` | `undefined` | optional text style for the title header |
| headerStyle | `ViewStyle` | `undefined` | optional header view style |
| shouldCollapse | `boolean` | `undefined` |  whenever you change it from `false` to `true`, it would be collapsed by force |
| rightChevronIcon | JSX.Element | `undefined` | if you pass a chevron element, it would point at bottom when it's collapsed and point to top when it's opened. (please notice that you should provide a chevron which points to the right) |
| onExpandStateChange | `(isExpanded: boolean) => void` | `undefined` | a callback closure in order to inform outside of the component about collapse state of it.
| children | React.ReactNode | **required input**  | the child component which would be collapsed or expanded by tapping the header title |