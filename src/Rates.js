import React, { Component } from 'react'
import { StyleSheet, Text, View,FlatList, TouchableOpacity  } from 'react-native';


class Rates extends Component {

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
            <View style={{width:300,alignItems:'center'}}>
                <FlatList style={styles.flatListStyle}
                    data={dataSource}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => {
                        return (
                            <View>
                                <TouchableOpacity style={styles.card}>
                                    <Text>{item}</Text>
                                </TouchableOpacity>
                            </View>)
                    }}
                />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    card: {
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


export default Rates;