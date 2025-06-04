interface ListIconProps {
  currentView: 'list' | 'grid';
}

const ListIcon = ({currentView}: ListIconProps) => {
    return (
        <svg fill={currentView === 'list' ? 'black' : 'lightgrey'} viewBox="0 -2 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" ><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>align_text_distribute [#914]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" strokeWidth="1" fillRule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-300.000000, -4161.000000)"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M244,4017 L264,4017 L264,4015 L244,4015 L244,4017 Z M244,4003 L264,4003 L264,4001 L244,4001 L244,4003 Z M244,4010 L264,4010 L264,4008 L244,4008 L244,4010 Z" id="align_text_distribute-[#914]"> </path> </g> </g> </g> </g></svg>
    ); 
}

export default ListIcon;