import {Component} from 'react'

export default class ErrorBoundary extends Component {
    constructor(props) {
      super(props);
      this.state = { hasError: null };
    }
  
     static getDerivedStateFromError(error) {
        console.log("error")
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      console.log(error, errorInfo);
    }
  
    render() {
        // alert("hie")
      if (this.state.hasError==true) {
        return <h1>Something went wrong:( </h1>;
      }
  else{
      return this.props.children; 

  }
    }
  }