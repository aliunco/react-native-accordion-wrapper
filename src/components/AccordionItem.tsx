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

type Configs = {
    title: string;
    isExpandable: boolean;
    titleStyle?: TextStyle;
    itemWrapperStyle?: ViewStyle;
    headerStyle?: ViewStyle;
    children?: React.ReactNode;
    childrenWrapperStyle?: ViewStyle;
    rightChevronIcon?: JSX.Element
    initialExpandedState?: boolean;
    onPress?: () => void;
    onExpandStateChange?: (isExpanded: boolean) => void;
}

type AccordionItemProps = Configs & {
    customHeaderItem?: (configs: Configs & { isExpanded: boolean }) => JSX.Element;
};

const AccordionItem = ({
    customHeaderItem,
    ...configs
}: AccordionItemProps) => {
    const [isExpanded, setIsExpanded] = React.useState<boolean>(
        configs.initialExpandedState ?? false,
    );
        
    React.useEffect(() => {
        if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }, []);
    
    React.useEffect(() => {
        if (isExpanded !== configs.initialExpandedState) {
            toggleExpandedState(configs.initialExpandedState);
        }
    }, [configs.initialExpandedState]);
    
    React.useEffect(() => {
        configs.onExpandStateChange?.(isExpanded);
    }, [isExpanded]);
    
    const changeExpandedState = () => {
        configs.onPress?.();
        toggleExpandedState();
    };

    const toggleExpandedState = (forcedValue?: boolean) => {
        if (configs.isExpandable === false) return;
        LayoutAnimation.configureNext({
            duration: 200,
            update: {
                type: 'easeIn',
            },
        });
        setIsExpanded((p) => forcedValue ?? !p);
    }
    
    return (
        <View style={[styles.itemContainer, configs.itemWrapperStyle]}>
            {
                customHeaderItem !== undefined ? customHeaderItem({ ...configs, isExpanded, onPress: changeExpandedState }) :
                <TouchableOpacity onPress={changeExpandedState}>
                    <View style={[styles.itemHeader, configs.headerStyle]}>
                        <Text style={configs.titleStyle}>{configs.title}</Text>
                        {
                            configs.rightChevronIcon !== undefined &&
                            <View style={{
                                    ...styles.chevronIcon,
                                    transform: [{rotate: `${isExpanded ? '0' : '180'}deg`}],
                                }}>
                                {configs.rightChevronIcon}
                            </View>
                        }
                    </View>
                </TouchableOpacity>
            }
            <View style={configs.childrenWrapperStyle}>
                {isExpanded && configs.children}
            </View>
        </View>
        );
};
    
const styles = StyleSheet.create({
    itemSeperator: {
        width: '100%',
    },
    chevronIcon: {
        justifyContent: "center",
        alignContent: "center",
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
        