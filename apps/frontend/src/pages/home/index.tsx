import React from 'react';
import Container from '../../components/Container';
interface IState {}
interface IProps {}

export default class RootPage extends React.Component<IProps, IState> {
  override state: IState = {};

  override render() {
    return (
      <>
        <Container />
      </>
    );
  }
}
