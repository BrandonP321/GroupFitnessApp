import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleProp, View, Text, Pressable, ScrollView, ViewStyle, TextStyle, Image } from "react-native";
import styles from "./HorizontalScrollingBtns.style";

interface IScrollingBtn {
    title: string;
    subtitle?: string;
    bgImg?: string;
    /* details for btn onPress event */
    detail?: any;
}

type HorizontalScrollingBtnsProps = {
    styles?: {
        scrollWrapper?: StyleProp<ViewStyle>;
        scrollTitle?: StyleProp<TextStyle>
        scrollBtn?: StyleProp<ViewStyle>;
        scrollBtnTitle?: StyleProp<TextStyle>;
        scrollBtnSubtitle?: StyleProp<TextStyle>;
    };
    btns: IScrollingBtn[];
    scrollTitle: string;
    onBtnClick?: (detail: any) => void;
    onMoreBtnClick?: () => void;
    CustomBtnComponent?: (props: IScrollingBtn & { index: number, onClick?: (detail: any) => void }) => JSX.Element
}

const HorizontalScrollingBtns = (props: HorizontalScrollingBtnsProps) => {
    const { styles: optStyles, btns, scrollTitle, onMoreBtnClick, CustomBtnComponent, onBtnClick } = props;

    return (
        <View style={[styles.scrollOuterWrapper, optStyles?.scrollWrapper]}>
            { scrollTitle &&
                <Text style={[styles.scrollTitle, optStyles?.scrollTitle]}>{scrollTitle}</Text>
            }

            <ScrollView 
                contentContainerStyle={[styles.scrollWrapper, optStyles?.scrollWrapper]}
                showsHorizontalScrollIndicator={false} 
                horizontal
                bounces
            >
                {btns.map((btn, i) => {
                    const { title, subtitle, bgImg, detail } = btn;

                    const isFirstBtn = i === 0;
                    const isLastBtn = i === btns.length - 1;

                    const btnStyles = [
                        styles.scrollBtn, 
                        optStyles?.scrollBtn, 
                        isFirstBtn && styles.firstBtn,
                        isLastBtn && !onMoreBtnClick && styles.lastBtn,
                    ]

                    if (CustomBtnComponent) {
                        return CustomBtnComponent({ title, subtitle, bgImg, onClick: onBtnClick ? (() => onBtnClick(detail)) : undefined, index: i })
                    } else {
                        return (
                            <Pressable key={i} style={btnStyles} onPress={onBtnClick ? () => onBtnClick(detail) : undefined}>
                                <View style={styles.btnContent} key={i}>
                                    <Image style={styles.btnBg} source={{ uri: bgImg }}/>
                                    <LinearGradient colors={["transparent", "rgba(0, 0, 0, .7)"]} style={styles.btnGradient}/>
                                    <Text style={[styles.scrollBtnTitle, optStyles?.scrollBtnTitle]}>{title}</Text>
                                    <Text style={[styles.scrollBtnSubtitle, optStyles?.scrollBtnSubtitle]}>{subtitle}</Text>
                                </View>
                            </Pressable>
                        )
                    }

                })}

                {onMoreBtnClick &&
                    <Pressable style={styles.moreBtn} onPress={onMoreBtnClick}>
                        <Text>View More</Text>
                    </Pressable>
                }
            </ScrollView>
        </View>
    )
}

export default HorizontalScrollingBtns