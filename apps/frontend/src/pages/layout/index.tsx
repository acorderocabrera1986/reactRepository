import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';

import HomePage from './../home';

const { Content, Footer } = Layout;


interface IState {}
interface IProps {}

export default class MainLayout extends React.Component<IProps, IState> {
  override state: IState = {}; 

  override render() {    
    return (
      <Layout>
        <Content style={{ height: 'calc(100vh - 57px'}}>
          <Router>
            <Routes>
              <Route path='/' element={<HomePage />}></Route>              
            </Routes>
          </Router>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    );
  }
}
