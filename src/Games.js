import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList, ScrollView } from 'react-native';
import Data from '../json/matches.json';
import Swiper from 'react-native-swiper';
import Game from './Game';

class Games extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            index1: 0,
            matchCount: 3,
            index2: 0,
        }
    }

    headerMove(index) {
        var a = parseInt(index);
        { a == 297 ? this.setState({ index1: 1 }) : null }
        { a == 595 ? this.setState({ index1: 2 }) : null }
        { a == 893 ? this.setState({ index1: 3 }) : null }
        { a == 1190 ? this.setState({ index1: 4 }) : null }
        { a == 1472 ? this.setState({ index1: 5 }) : null }
        { a == 0 ? this.setState({ index1: 0 }) : null }
    }

    scrollToAll(scrollX, index) {
        const { matchCount } = this.state;
        for (var i = 0; i < matchCount; i++) {
            { i == index ? null : this[`scrollViewRef${i}`].scrollTo({ x: scrollX }) }
        }
    }

    changeIndex2(index) {
        console.log(index)
        this.setState({
            index2: index
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

        const { dataSource, index1, index2 } = this.state;
        return (
            <View>
                <View style={styles.head}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.headSwiper}>{index1 == 0 ? <Text style={styles.headSwiperTextPicked}>MS-2,5</Text> : <Text style={styles.headSwiperText}>MS-2,5</Text>}</View>
                        <View style={styles.headSwiper}>{index1 == 1 ? <Text style={styles.headSwiperTextPicked}>HMS</Text> : <Text style={styles.headSwiperText}>HMS</Text>}</View>
                        <View style={styles.headSwiper}>{index1 == 2 ? <Text style={styles.headSwiperTextPicked}>ÇŞ-KG</Text> : <Text style={styles.headSwiperText}>ÇŞ-KG</Text>}</View>
                        <View style={styles.headSwiper}>{index1 == 3 ? <Text style={styles.headSwiperTextPicked}>1.Y 0,5 - 1.Y 1,5</Text> : <Text style={styles.headSwiperText}>1.Y 0,5 - 1.Y 1,5</Text>}</View>
                        <View style={styles.headSwiper}>{index1 == 4 ? <Text style={styles.headSwiperTextPicked}>1,5-3,5</Text> : <Text style={styles.headSwiperText}>1,5-3,5</Text>}</View>
                        <View style={styles.headSwiper}>{index1 == 5 ? <Text style={styles.headSwiperTextPicked}>TGA</Text> : <Text style={styles.headSwiperText}>TGA</Text>}</View>
                    </View>
                    <Swiper index={index1} dot={<View style={styles.dot} />} activeDot={<View style={styles.activeDot} />} >
                        <View></View><View></View><View></View><View></View><View></View><View></View>
                    </Swiper>
                </View>
                <FlatList
                    data={dataSource}
                    keyExtractor={(item) => item.name}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={styles.menu} onPress={() => this.openModal(item)}>
                                <Text style={styles.menuText}>{item.name}</Text>
                                <ScrollView style={{ width: '85%' }}
                                    key={index}
                                    horizontal
                                    pagingEnabled
                                    onMomentumScrollEnd={e => { var index = e.nativeEvent.contentOffset.x; this.headerMove(index) }}
                                    scrollEnabled
                                    decelerationRate="fast"
                                    onTouchStart={()=> this.changeIndex2(index)}
                                    showsHorizontalScrollIndicator={false}
                                    scrollEventThrottle={16}
                                    snapToAlignment='center'
                                    onScroll={index == index2 ? e => { var scrollX = e.nativeEvent.contentOffset.x; this.scrollToAll(scrollX, index) } : null}
                                    ref={a => (this[`scrollViewRef${index}`] = a)}
                                >
                                    <Game items={item.game1} />
                                    <Game items={item.game2} />
                                    <Game items={item.game3} />
                                    <Game items={item.game4} />
                                    <Game items={item.game5} />
                                    <Game items={item.game6} />
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
    menu: {
        height: 150,
        width: '90%',
        borderWidth: 10,
        borderColor: 'black',
        marginTop: '2%',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 10,
    },
    menuText: {
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
        color: 'red'
    },
    headSwiperText: {
        color: 'black'
    }
});

export default Games;