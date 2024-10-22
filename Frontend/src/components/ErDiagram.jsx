import ERDiagramIMG from '../assets/ERDiagram.png'; 

export default function ERDiagram() {
    return (
        <div>
            <br></br>
            <h1>Entity-Relationship Diagram</h1>
            <img src={ERDiagramIMG} alt="ER Diagram" style={{ width: '65%', height: 'auto' }} />
        </div>
    );
}