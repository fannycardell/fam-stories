import ForceGraph2D from 'react-force-graph-2d';
import { Graph } from '../store/familyMembersToGraph';

export const TheTree = ({graphData} : {graphData:Graph }) => {
    return <ForceGraph2D
          graphData={graphData}
          nodeAutoColorBy="group"
          onNodeDragEnd={node => {
            node.fx = node.x;
            node.fy = node.y;
          }}
          nodeCanvasObject={(node:any, ctx:any, globalScale:any) => {
        
            const label = node.name;

            const fontSize = 12/globalScale;
            ctx.font = `${fontSize}px Open Sans`;
            const textWidth = ctx.measureText(label).width;
            const bckgDimensions = [textWidth, fontSize, ].map(n => n + fontSize * 0.6); // some padding

            ctx.fillStyle = '#eae318';
            ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = node.color;
            ctx.fillText(label, node.x, node.y);

            node.__bckgDimensions = bckgDimensions; // to re-use in nodePointerAreaPaint
          }}
          nodePointerAreaPaint={(node:any, color:any, ctx:any) => {
            ctx.fillStyle = color;
            const bckgDimensions = node.__bckgDimensions;
            bckgDimensions && ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);
          }}
        />
}

//<Link to={`/profilepage/${familyMember._id}`}>{familyMember.name}</Link>