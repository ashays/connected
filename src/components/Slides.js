import './Slides.css';

function LoadingSlide(props) {
    return (
        <div className="slide">
            <main>
                <div className="loader"></div>
                <div>{props.message}</div>
            </main>
        </div>
    );
}

function LandingSlide(props) {
    return (
        <div className="slide">
            <main>
                <h1>Let’s make presentations smarter, more engaging, and interactive</h1>
                <div className="subtitle">Hop on your phone and give it a try—</div>
                <div className="link">{window.location.href + "join/" + props.id}</div>
            </main>
        </div>
    );
}

function LobbySlide(props) {
    // let participantsListed = Object.entries(props.participants).map((entry, i) => (
    //     <div key={entry[0]}>{entry[1].name ? entry[1].name : "Unnamed Person " + i}</div>
    // ));
    return (
        <div className="slide slideB">
            <main>
                <h1>Nice! Wasn’t that easy?</h1>
                <div className="subtitle">Join on another device for even more fun, or choose a demo below</div>
            </main>
        </div>
    );
}

function PollSlide(props) {
    return (
        <div>Poll!</div>
    );
}

export { LoadingSlide, LandingSlide, LobbySlide, PollSlide };