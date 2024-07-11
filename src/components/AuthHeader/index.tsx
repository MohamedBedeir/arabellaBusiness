import React from 'react';
import { ImageBackground, Image } from 'react-native';
import { styles } from './styles';

interface AuthHeaderProps {
    image?: string | any;
    icon?: string | any;
};

const AuthHeader: React.FC<AuthHeaderProps> = ({
    image,
    icon,
}) => (
    <ImageBackground source={image} style={styles.container} imageStyle={styles.container}>
        <Image source={icon} style={styles.icon}/>
    </ImageBackground>
);

export default AuthHeader;
