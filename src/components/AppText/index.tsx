import React from 'react';
import { Text } from 'react-native';

interface AppButtonProps {
    title?: string | any;
    fontSize?:  number;
    fontFamily?: string;
    textAlign?: string | any;
    color?: string | any;
    lineHeight?: number;
    marginBottom?: number;
    width?: number;
    numberOfLines?: number;
};

const AppText: React.FC<AppButtonProps> = ({
    title,
    fontSize,
    fontFamily,
    textAlign,
    color,
    lineHeight,
    marginBottom,
    width,
    numberOfLines,
}) => (
    <Text 
        style={{
            fontSize,
            fontFamily,
            textAlign,
            color,
            lineHeight,
            marginBottom,
            width,
        }}
        numberOfLines={numberOfLines || 1}
    >
        {title}
    </Text>
);

export default AppText;
                   