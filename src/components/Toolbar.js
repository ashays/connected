import React from 'react';
import './Toolbar.css';

class Toolbar extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps) {
    }

    render() {
        let participantsListed = Object.entries(this.props.participants).map((entry, i) => (
            <div key={entry[0]}>{entry[1].name ? entry[1].name : "Unnamed Person " + i}</div>
        ));
        return (
            <div>
                <div className="toolbar">
                    <div className="section" title="Participants">
                        <svg viewBox="0 0 32 32">
                            <path d="M16 0c-8.837 0-16 7.163-16 16s7.163 16 16 16c8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 26c-1.514 0-2.95-0.337-4.236-0.94l1.036-1.727c0.98 0.428 2.061 0.667 3.199 0.667 2.913 0 5.462-1.557 6.861-3.884l1.715 1.029c-1.749 2.908-4.935 4.855-8.576 4.855zM26 12c0 1.1-0.9 2-2 2h-4c-1.1 0-2-0.9-2-2h-4c0 1.1-0.9 2-2 2h-4c-1.1 0-2-0.9-2-2v-3c0-0.55 0.45-1 1-1h6c0.55 0 1 0.45 1 1v1h4v-1c0-0.55 0.45-1 1-1h6c0.55 0 1 0.45 1 1v3z"></path>
                        </svg>
                        <span style={{ marginLeft: "8px" }}>{Object.entries(this.props.participants).length}</span>
                    </div>
                    <div className="section" title="Mode">
                        <svg viewBox="0 0 32 32">
                            <path d="M2 6h28v6h-28zM2 14h28v6h-28zM2 22h28v6h-28z"></path>
                        </svg>
                    </div>
                    <div className="section" title="Settings">
                        <svg viewBox="0 0 32 32">
                            <path d="M29.181 19.070c-1.679-2.908-0.669-6.634 2.255-8.328l-3.145-5.447c-0.898 0.527-1.943 0.829-3.058 0.829-3.361 0-6.085-2.742-6.085-6.125h-6.289c0.008 1.044-0.252 2.103-0.811 3.070-1.679 2.908-5.411 3.897-8.339 2.211l-3.144 5.447c0.905 0.515 1.689 1.268 2.246 2.234 1.676 2.903 0.672 6.623-2.241 8.319l3.145 5.447c0.895-0.522 1.935-0.82 3.044-0.82 3.35 0 6.067 2.725 6.084 6.092h6.289c-0.003-1.034 0.259-2.080 0.811-3.038 1.676-2.903 5.399-3.894 8.325-2.219l3.145-5.447c-0.899-0.515-1.678-1.266-2.232-2.226zM16 22.479c-3.578 0-6.479-2.901-6.479-6.479s2.901-6.479 6.479-6.479c3.578 0 6.479 2.901 6.479 6.479s-2.901 6.479-6.479 6.479z"></path>
                        </svg>
                    </div>
                </div>
                <div className="toolbar-menu">
                    <div className="title">Participants</div>
                    {participantsListed}
                </div>
            </div>
        );
    }
}

export default Toolbar;