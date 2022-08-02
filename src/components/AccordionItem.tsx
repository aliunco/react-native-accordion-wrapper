import React from 'react';
import {
    LayoutAnimation,
    Platform,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    UIManager,
    View,
    ViewStyle,
} from 'react-native';

type AccordionItemProps = {
    title: string;
    titleStyle?: TextStyle;
    headerStyle?: ViewStyle;
    shouldCollapse?: boolean;
    rightChevronIcon?: JSX.Element
    onExpandStateChange?: (isExpanded: boolean) => void;
    children: React.ReactNode;
};

const AccordionItem = ({
    title,
    children,
    titleStyle,
    headerStyle,
    shouldCollapse,
    rightChevronIcon,
    onExpandStateChange,
}: AccordionItemProps) => {
    const [isExpanded, setIsExpanded] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
            UIManager.setLayoutAnimationEnabledExperimental(true)
        }
    }, []);

    React.useEffect(() => {
        if (shouldCollapse === true) {
            LayoutAnimation.configureNext({
                duration: 200,
                update: {
                    type: 'easeIn',
                },
            });
            setIsExpanded(false);
        }
    }, [shouldCollapse]);

    React.useEffect(() => {
        onExpandStateChange?.(isExpanded);
    }, [isExpanded]);

    const changeExpandedState = () => {
        LayoutAnimation.configureNext({
            duration: 200,
            update: {
                type: 'easeIn',
            },
        });
        setIsExpanded((p) => !p);
    };

    return (
        <View style={styles.itemContainer}>
            <TouchableOpacity onPress={changeExpandedState}>
                <View style={[styles.itemHeader, headerStyle]}>
                    <Text style={titleStyle}>{title}</Text>
                    {
                        rightChevronIcon !== undefined &&
                        <View style={[styles.chevronIcon, { transform: [{ rotate: `${isExpanded ? '-90' : '90'}deg` }] }]}>
                            {rightChevronIcon}
                        </View>
                    }
                </View>
            </TouchableOpacity>
            {isExpanded && children}
        </View>
    );
};

const styles = StyleSheet.create({
    itemSeperator: {
        width: '100%',
    },
    chevronIcon: {
        width: 25,
        height: 25
    },
    itemHeader: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 9,
        paddingBottom: 10,
        backgroundColor: '#F1F1F1',
        borderBottomColor: '#DEDEDE',
        borderBottomWidth: 1,
    },
    itemContainer: {
        width: '100%',
    },
});

export default AccordionItem;
