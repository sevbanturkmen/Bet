import React, { Component } from 'react'
import { StyleSheet, Text, View,FlatList, TouchableOpacity  } from 'react-native';


class Game extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: []
        }
    }

    
    componentDidMount() {
        this.setState({
            dataSource: this.props.items
        })
    }

    render() {

        const { dataSource } = this.state;

        return (
            <View>
                <FlatList style={styles.flatListStyle}
                    data={dataSource}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => {
                        return (
                            <View>
                                <TouchableOpacity style={styles.menu}>
                                    <Text style={styles.menuText}>{item}</Text>
                                </TouchableOpacity>
                            </View>)
                    }}
                />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    menu: {
        height: 40,
        width: 50,
        backgroundColor:'gray',
        borderRadius: 10,
        marginLeft:5,
        marginTop:30,
        justifyContent:'center',
        alignItems:'center'
    },
    flatListStyle:{
        flexDirection:'row',
        marginRight:10,
        marginLeft:10
    }
});


export default Game;