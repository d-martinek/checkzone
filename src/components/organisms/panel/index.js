import React from 'react';
import styled, { withTheme } from 'styled-components';
import {
    Animated,
} from 'react-native';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '_utils/dimensions.js';

import SlidingUpPanel from 'rn-sliding-up-panel';

import HorizontalLine from '_atoms/horizontalLine/index.js';
import Navigation from '_molecules/_panel/navigation/index.js';
import ProjectSelect from '_molecules/_panel/projectSelect/index.js';
import CurrentLogInfo from '_molecules/_panel/currentLogInfo/index.js';
// import ProjectLogInfo from '_molecules/_panel/projectLogInfo/index.js';
import ProjectTodo from '_molecules/_panel/projectTodo/index.js';

class Panel extends React.Component {
    static defaultProps = {
        draggableRange: { top: hp('100%'), bottom: hp('7.5%') },
    };
    _draggedValue = new Animated.Value(hp('7.5%'));
    closePanelEvent = () => {
        this._panel.show({ toValue: hp('7.5%'), velocity: 3 });
    };

    togglePanel = () => {
        const { top } = this.props.draggableRange;
        const maxPos = top - hp('7.5%');
        const currentPanelValue = JSON.stringify(this._draggedValue);

        if (currentPanelValue === String(hp('7.5%'))) {
            this._panel.show(hp('20%'));
        } else if (currentPanelValue === String(hp('20%'))) {
            this._panel.show(maxPos);
        } else {
            this._panel.hide();
        }
    };
    
    render() {
        const { top, bottom } = this.props.draggableRange;

        return (
            <PanelContainer pointerEvents={'box-none'}>
                <SlidingUpPanel
                    ref={c => (this._panel = c)}
                    draggableRange={{ top: top - hp('7.5%'), bottom: bottom }}
                    animatedValue={this._draggedValue}
                    snappingPoints={[hp('20%')]}
                    friction={1}
                    showBackdrop={false}
                >
                    <PanelWrapper>
                        <HookContainer
                            onPress={this.togglePanel}
                            activeOpacity={this.props.theme.options.activeOpacity}
                        >
                            <HookWrapper>
                                <Hook></Hook>
                            </HookWrapper>
                        </HookContainer>

                        <Navigation
                            navigation={this.props.navigation}
                            closePanel={this.closePanelEvent}
                        ></Navigation>

                        <HorizontalLine/>

                        <ProjectSelect></ProjectSelect>

                        <CurrentLogInfo></CurrentLogInfo>

                        {/* <ProjectLogInfo></ProjectLogInfo> */}
                        
                        <ProjectTasksText>Tasks</ProjectTasksText>
                        <ProjectTodo></ProjectTodo>
                    </PanelWrapper>
                </SlidingUpPanel>
            </PanelContainer>
        );
    }
}

const PanelContainer = styled.View`
    position: absolute;
    height: ${hp('100%')};
    width: ${wp('100%')};
`;

const PanelWrapper = styled.View`
    flex: 1;
    position: relative;
    background-color: ${props => props.theme.colors.primary || '#ffffff'}};
    border-top-left-radius: ${wp('5%')};
    border-top-right-radius: ${wp('5%')};
`;

const HookContainer = styled.TouchableOpacity`
    opacity: ${props => props.theme.options.initialOpacity || 1};
`;

const HookWrapper = styled.View`
    height: ${hp('8%')};
    width: ${wp('100%')};
    display: flex;
    justify-content: center;
`;

const Hook = styled.View`
    height: ${hp('1%')};
    margin: 0px ${hp('24%')}px 0px ${hp('24%')}px;
    border-radius: ${hp('5%')};
    background-color: ${props => props.theme.colors.textPrimary || '#ffffff'}};
`;

const ProjectTasksText = styled.Text`
    color: ${props => props.theme.colors.textPrimary || '#000000'}};
    padding: ${hp('2%')}px;

    ${props => props.theme.fonts.size.beta}
    text-transform: uppercase;
`;

export default withTheme(Panel);
