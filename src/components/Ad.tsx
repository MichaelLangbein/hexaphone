import { Component } from "react";


export class Ad extends Component {

    componentDidMount() {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
    }

    render() {
        return (
            <ins className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client="ca-pub-3884549024745388"
                data-ad-slot="5363376547"
                data-ad-format="auto"
                data-full-width-responsive="true"></ins>
        );
    }
}