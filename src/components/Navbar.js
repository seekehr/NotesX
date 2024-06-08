

function Navbar() {
    const writeNote = () => {
        alert("hi");
    };

    return (
        <div className="navbar">
            <ul>
                <li>
                <div className='writenote'>
                    <button type="button" title="Write a note!" onClick={writeNote}>
                        <img src={`${process.env.PUBLIC_URL}/newnote.svg`} alt="Write note."></img>
                    </button>
                </div>
                </li> 
                <li><div className='listnotes'>
                    <button type="button" title="List notes." onClick={writeNote}>
                        <img src={`${process.env.PUBLIC_URL}/listnotes.svg`} alt="List notes."></img>
                    </button>
                </div>
                </li>
            </ul>
            
        </div>
    );
}

export default Navbar;