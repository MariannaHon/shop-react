interface GridIconProps {
  currentView: 'list' | 'grid';
}

const GridIcon = ({currentView}: GridIconProps) => {
    return (
        <svg fill={currentView === 'grid' ? 'black' : 'lightgrey'} viewBox="0 -0.5 21 21" version="1.1" xmlns="http://www.w3.org/2000/svg" ><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>grid_system [#1520]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" strokeWidth="1" fillRule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-59.000000, -240.000000)"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M16.65,98 L21.9,98 L21.9,93 L16.65,93 L16.65,98 Z M14.55,100 L24,100 L24,91 L14.55,91 L14.55,100 Z M5.1,98 L10.35,98 L10.35,93 L5.1,93 L5.1,98 Z M3,100 L12.45,100 L12.45,91 L3,91 L3,100 Z M16.65,87 L21.9,87 L21.9,82 L16.65,82 L16.65,87 Z M14.55,89 L24,89 L24,80 L14.55,80 L14.55,89 Z M5.1,87 L10.35,87 L10.35,82 L5.1,82 L5.1,87 Z M3,89 L12.45,89 L12.45,80 L3,80 L3,89 Z" id="grid_system-[#1520]"> </path> </g> </g> </g> </g></svg>
    ); 
}

export default GridIcon;

