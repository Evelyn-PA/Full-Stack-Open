const Header = (props) => {
    return (
        <h1>{props.course.name}</h1>
    )
}

//Create small component for excercise 1.2
const Part = (props) => {
    return (

        <p>{props.name} {props.exercises}</p>
    )
}
//Content component
const Content = (props) => {
    return (
        <>
            <Part name={props.part[0].name} exercises={props.part[0].exercises} />
            <Part name={props.part[1].name} exercises={props.part[1].exercises} />
            <Part name={props.part[2].name} exercises={props.part[2].exercises} />
        </>

    )
}

//Total component
const Total = (props) => {
    return (
        <p>Number of exercises {props.part[0].exercises + props.part[1].exercises + props.part[2].exercises}</p>
    )
}

export default function Course({ course }) {
    return (
        <div>
            <Header course={course} />
            <Content
                part={course.parts}
            />
            <Total
                part={course.parts}
            />
        </div>
    )
}


