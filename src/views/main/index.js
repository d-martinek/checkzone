import * as React from 'react';
import styled, { withTheme } from 'styled-components';
import { StatusBar } from 'react-native';

import { connect } from 'react-redux'
import { initData, setTheme } from '_redux/actions.js';
import { TouchableOpacity } from 'react-native';

import Counter from '_molecules/counter/index.js';
import Panel from '_organisms/panel/index.js';

class Main extends React.Component {
    componentWillMount() {
        this.props.initData();
    }

        changeTheme() {
        if(this.props.theme.label === 'dark') {
            this.props.setTheme('light')
        } else {
            this.props.setTheme('dark')
        }
    }

    render() {
        return (
            <MainContainer>
                <StatusBar barStyle="light-content" />
                <TouchableOpacity onPress={() => this.changeTheme()}>
                    <Txt>Toggle Theme</Txt>
                </TouchableOpacity>
                <Counter navigation={this.props.navigation}></Counter>
                <Panel navigation={this.props.navigation}></Panel>
            </MainContainer>
        );
    }
}

const MainContainer = styled.View`
    flex: 1;
    justify-content: center;
    background-color: ${props => props.theme.colors.secondary || '#000000'};
    padding: 8px;
`;

const Txt = styled.Text`
    color: gray;
    text-align: center;
`;

const mapDispatchToProps = dispatch => {
    return {
        initData: () => initData(dispatch),
        setTheme: (theme) => dispatch(setTheme(theme)),
    }
}

export default connect(null, mapDispatchToProps)(withTheme(Main));