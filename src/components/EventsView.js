import React from 'react';
import { Text, View, Image } from 'react-native';
import Card from './Card';
import CardContainer from './CardContainer'

const EventsView = ({ eventData }) => {
    const { coment, date, daysRemaining, imagePath, key, title, type } = eventData;
    const {
        imageStyle,
        thumbnailStyle,
        headerTextStyle,
        headerContentStyle,
        thumbnailContainerStyle,
        regularText
    } = styles;

    /*
    @ Jose Carvajal
    *Este componente permite la creación de Cards
    *Emplea Card component y CardContainer component
    */
    return (
        <Card>
            <CardContainer>
                <View style={thumbnailContainerStyle}>
                    <Image
                        style={thumbnailStyle}
                        source={{ uri: imagePath }}
                    />
                </View>
                <View style={headerContentStyle}>
                    <Text style={headerTextStyle}>{title}</Text>
                    <Text
                        style={regularText}
                    >{coment}</Text>
                    <Text style={regularText}
                    >Tipo de evento: {type}</Text>
                </View>
            </CardContainer>
            <CardContainer>
                <View style={headerContentStyle}>
                    <Text style={headerTextStyle}>Faltan: {daysRemaining} días</Text>
                    <Text style={headerTextStyle}>Fecha del evento: {date}</Text>
                </View>
            </CardContainer>
        </Card>
    );
};

const styles = {
    headerContentStyle: {
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    headerTextStyle: {
        fontSize: 18,
        color: '#FFF'
    },
    thumbnailStyle: {
        height: 70,
        width: 70
    },
    thumbnailContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10
    },
    imageStyle: {
        height: 300,
        flex: 1,
        width: null
    },
    regularText: {
        color: '#FFF'
    }
};

export default EventsView;