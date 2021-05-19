import { Component } from "react";


export class Ad extends Component {

    componentDidMount() {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
    }

    render() {
        return (
            <ins 
                className='addsbygoogle'
                style={{ display: 'block' }}
                data-ad-client=''
                data-ad-slot=''
                data-ad-format='auto'
            />
        );
    }
}