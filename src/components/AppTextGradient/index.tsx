import React from 'react';
import TextGradient from '@furkankaya/react-native-linear-text-gradient';

interface AppButtonProps {
    title?: string | any;
    fontSize?:  number;
    fontFamily?: string;
    textAlign?: string | any;
    colorStart?: string | any;
    colorEnd?: string | any;
};

const AppTextGradient: React.FC<AppButtonProps> = ({ title, fontSize, fontFamily, textAlign, colorStart, colorEnd }) => (
    <TextGradient
        text={title}
        style={{fontSize, fontFamily, textAlign}}
        colors={[colorStart, colorEnd]}
        locations={[0, 1]}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
    />
);

export default AppTextGradient;
                   