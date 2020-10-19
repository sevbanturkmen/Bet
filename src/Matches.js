import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList, ScrollView } from 'react-native';
import Data from '../json/matches.json';
import Rates from './Rates';

class Matches extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            game: 0,
            matchCount: 3,
            selected: 0,
        }
    }

    headerMove(index) {
        var a = parseInt(index);
        { a == 300 ? this.setState({ game: 1 }) : null }
        { a == 600 ? this.setState({ game: 2 }) : null }
        { a == 900 ? this.setState({ game: 3 }) : null }
        { a == 1200 ? this.setState({ game: 4 }) : null }
        { a == 1500 ? this.setState({ game: 5 }) : null }
        { a == 0 ? this.setState({ game: 0 }) : null }
    }

    scrollAll(scrollX, index) {
        const { matchCount } = this.state;
        for (var i = 0; i < matchCount; i++) {
            { i == index ? null : this[`scrollViewRef${i}`].scrollTo({ x: scrollX }) }
        }
    }

    changeSelectedIndex(index) {
        this.setState({
            selected: index
        })
    }

    componentDidMount() {
        this.setState({
            dataSource: Data.matches
        })
        for (var i = 1; i < this.matchCount; i++) {
            this[`scrollViewRef${i}`] = React.createRef();
        }
    }

    render() {
        const { dataSource, game, selected } = this.state;
        return (
            <View>
                <View style={styles.head}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.headSwiper}><Text style={game==0?styles.headSwiperTextPicked:styles.headSwiperText}>MS-2,5</Text></View>
                        <View style={styles.headSwiper}><Text style={game==1?styles.headSwiperTextPicked:styles.headSwiperText}>HMS</Text></View>
                        <View style={styles.headSwiper}><Text style={game==2?styles.headSwiperTextPicked:styles.headSwiperText}>ÇŞ-KG</Text></View>
                        <View style={styles.headSwiper}><Text style={game==3?styles.headSwiperTextPicked:styles.headSwiperText}>1.Y 0,5 - 1.Y 1,5</Text></View>
                        <View style={styles.headSwiper}><Text style={game==4?styles.headSwiperTextPicked:styles.headSwiperText}>1,5-3,5</Text></View>
                        <View style={styles.headSwiper}><Text style={game==5?styles.headSwiperTextPicked:styles.headSwiperText}>TGA</Text></View>
                    </View>
                </View>
                <FlatList
                    data={dataSource}
                    keyExtractor={(item) => item.name}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={styles.card} onPress={() => this.openModal(item)}>
                                <Text style={styles.mainText}>{item.name}</Text>
                                <ScrollView style={{width:300}}
                                    key={index}
                                    horizontal
                                    pagingEnabled
                                    onMomentumScrollEnd={e => { var index = e.nativeEvent.contentOffset.x; this.headerMove(index) }}
                                    scrollEnabled
                                    decelerationRate="normal"
                                    onTouchStart={()=> this.changeSelectedIndex(index)}
                                    showsHorizontalScrollIndicator={false}
                                    scrollEventThrottle={16}
                                    snapToAlignment='center'
                                    onScroll={index == selected ? e => { var scrollX = e.nativeEvent.contentOffset.x; this.scrollAll(scrollX, index) } : null}
                                    ref={e => (this[`scrollViewRef${index}`] = e)}
                                >
                                    <Rates items={item.game1} />
                                    <Rates items={item.game2} />
                                    <Rates items={item.game3} />
                                    <Rates items={item.game4} />
                                    <Rates items={item.game5} />
                                    <Rates items={item.game6} />
                                </ScrollView>
                            </View>
                        )
                    }}
                />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    card: {
        height: 150,
        width: '90%',
        borderWidth: 10,
        borderColor: 'black',
        marginTop: '2%',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 10,
    },
    mainText: {
        fontSize: 17,
        marginTop: 5
    },
    wrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginLeft: '10%'
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },
    head: {
        height: '20%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headSwiper: {
        marginTop: '5%',
        borderColor: 'blue',
        borderWidth: 1,
        width: 60,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5
    },
    dot: {
        marginLeft: '7%',
        marginRight: '7%',
        borderWidth: 1,
        borderColor: 'black',
        width: 10,
        height: 1
    },
    activeDot: {
        marginLeft: '7%',
        marginRight: '7%',
        borderWidth: 1,
        borderColor: 'red',
        width: 10,
        height: 1
    },
    headSwiperTextPicked: {
        color: 'red',
        fontWeight:'bold'
    },
    headSwiperText: {
        color: 'black',
        fontWeight:'100'
    }
});

export default Matches;