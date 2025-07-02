import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, StyleProp, ViewStyle } from 'react-native';
import Animated, { useAnimatedProps, useSharedValue, withSpring } from 'react-native-reanimated';
import Svg, { Path, Circle, Line, Defs, RadialGradient, Stop, Rect } from 'react-native-svg';
import { useTheme } from '../ThemeProvider';

import { PointsToGrade900 } from '../../client/static/AbiturMaths';

// This is vibe-based (fully reasonable in my eyes)
const colorForValue = (value: number, goal: number): string => {
    'worklet';

    type RGB = [number, number, number];

    const toRgbString = ([r, g, b]: RGB): string => `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;

    // Clamp goal between 400 and 900
    goal = Math.max(400, Math.min(goal, 900));

    // Define the dynamic stop ranges
    const range = 900 - 400;
    const tolerance = range * 0.05; // 5% = 25 points

    const greenMin = goal - tolerance;
    const greenMax = goal + tolerance;

    // Adjust stops: red → yellow → green → golden
    const stops: { x: number; color: RGB }[] = [
        { x: 400, color: [255, 0, 0] },             // Red
        { x: greenMin - 50, color: [255, 165, 0] }, // Orange (arbitrary midpoint before green)
        { x: greenMin, color: [0, 255, 0] },        // Start of green
        { x: greenMax, color: [255, 215, 0] },      // Start of golden
        { x: 900, color: [255, 215, 0] },           // Golden continues to max
    ];

    // Interpolate between nearest stops
    for (let i = 0; i < stops.length - 1; i++) {
        const left = stops[i];
        const right = stops[i + 1];

        if (value >= left.x && value <= right.x) {
            const t = (value - left.x) / (right.x - left.x);
            const r = left.color[0] + (right.color[0] - left.color[0]) * t;
            const g = left.color[1] + (right.color[1] - left.color[1]) * t;
            const b = left.color[2] + (right.color[2] - left.color[2]) * t;
            return toRgbString([r, g, b]);
        }
    }

    return 'rgb(0,0,0)'; // Fallback (shouldn’t be reached)
};


const AnimatedPath = Animated.createAnimatedComponent(Path);

const GradeGauge: React.FC<{points: number, goalPoints:number, size?: number, style?: StyleProp<ViewStyle>}> = ({ points, goalPoints, size = Dimensions.get('window').width - 16 * 2 - 50, style}) => {
    const { colors } = useTheme();

    // Random shit for the svg
    const cx = size / 2;
    const cy = size / 2;

    const strokeWidth = 30;
    const radius = (size - strokeWidth) / 2;
    const circumfrence = radius * Math.PI;

    // Helper functions
    const toRad = (angle: number) => {'worklet'; return((angle - 90) * Math.PI / 180.0)};
    const polarToCartesian = (cx: number, cy: number, r: number, angle: number) => {
        'worklet';
        return {
            x: cx + r * Math.cos(toRad(angle)),
            y: cy + r * Math.sin(toRad(angle)),
        };
    };

    const markerPositions = (() => {
        // In the radius: account for stroke width and rounded cap size
        const polarEndCoords = polarToCartesian(cx, cy, radius + strokeWidth * 0.5 - 2, (180 * Math.max(0, Math.min((goalPoints - 300) / 600, 1))) - 90);

        // In the radius: account for stroke width and rounded cap size
        const polarStartCoords = polarToCartesian(cx, cy, radius - strokeWidth * 0.5 + 2, (180 * Math.max(0, Math.min((goalPoints - 300) / 600, 1))) - 90);

        const xS = polarStartCoords.x;
        const yS = polarStartCoords.y;
        
        const yE = polarEndCoords.y;
        const xE = polarEndCoords.x;

        return{
            xS: xS, 
            yS: yS,
            xE: xE,
            yE: yE,
        }
    })();

    // For animating the value arc
    const animatedValue = useSharedValue(0);
    const animatedProps = useAnimatedProps(() => {
        // start = 300 points (since 300 is minimum to pass)
        const percentage = (animatedValue.value - 300) / 600;

        const angle = 180 * Math.max(0, Math.min(percentage, 1)); // Clamp 0–1
        const startAngle = -90;
        const endAngle = startAngle + angle;

        // This shit is vibe-based, cause I can't be bothered with SVG paths :shrug:
        const start = polarToCartesian(cx, cy, radius, startAngle);
        const end = polarToCartesian(cx, cy, radius, endAngle);
    
        const arcPath = [
            'M', start.x, start.y,
            'A', radius, radius, 0, 0, 1, end.x, end.y
        ].join(' ');

        return { 
            d: arcPath,
            // animate stroke color aswell (we just recompute everytime animatedValue changes)
            stroke: `${colorForValue(animatedValue.value, goalPoints)}`
        };
    });

    // Animate on startup
    useEffect(() => {
        const springConfig = {
            damping: 25,
            stiffness: 10,
            mass: 1.5,
        };

        animatedValue.value = withSpring(points, springConfig);
    }, [points]);

    const styles = StyleSheet.create({
        conatiner: {
            width: size, 
            height: size, 
            alignItems: 'center', 
            justifyContent: 'center',
            alignSelf: 'center',
        },
        labelContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20,
        },
        labelBig: {
            fontSize: 24,
            fontWeight: 600,
            color: colors.fontColor
        },
        labelSmall: {
            fontSize: 15,
            color: colors.lightFontColor
        }
    });

    return (
        <View style={[styles.conatiner, style]}>
            <Svg width={size} height={size}>
                <Defs>
                    <RadialGradient
                        id="grad"
                        cx="50%" cy="30%"
                        rx="40%" ry="30%"
                    >
                        <Stop offset="0%" stopColor={colorForValue(points, goalPoints)} stopOpacity="0.15" />
                        <Stop offset="100%" stopOpacity="0" />
                    </RadialGradient>
                </Defs>

                {/* Background gradient */}
                <Rect
                    x={0}
                    y={0}
                    width={`${size}`}
                    height={`${size}`}
                    fill={'url(#grad)'}
                />

                {/* Background Circle */}
                <Circle
                    cx={cx}
                    cy={cy}
                    r={radius}
                    stroke={'rgba(0, 0, 0, 0.5)'}
                    strokeWidth={strokeWidth}
                    strokeLinecap='round'
                    transform={`rotate(180, ${cx}, ${cy})`}
                    strokeDasharray={`${circumfrence}, ${circumfrence}`}
                    fill="none"
                />

                {/* Value Arc */}
                <AnimatedPath
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeLinecap="round"
                    animatedProps={animatedProps}
                />

                {/* Goal Marker */}
                <Line
                    x1={markerPositions.xS}
                    y1={markerPositions.yS}
                    x2={markerPositions.xE}
                    y2={markerPositions.yE}
                    stroke="white"
                    strokeWidth={4}
                    strokeLinecap="round"
                />
            </Svg>

            {/* Text */}
            <View style={StyleSheet.absoluteFillObject}>
                <View style={styles.labelContainer}>
                    <Text style={styles.labelBig}>{PointsToGrade900(points)}</Text>
                    <Text style={styles.labelSmall}>{points}</Text>
                </View>
            </View>
        </View>
    );
};



export default GradeGauge;
