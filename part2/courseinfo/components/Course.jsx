export default function Course({ course }) {
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
    const Total2 = course.parts.reduce((s, p) => s+p.exercises, 0)
    const Total = (props) => {
        return (
            <p><b>total of {props.part[0].exercises + props.part[1].exercises + props.part[2].exercises} exercises</b></p>
        )
    }
    return (
        <div>
            <Header course={course} />
            <Content
                part={course.parts}
            />
            <Total
                part={course.parts}
            />

            <p>Total {Total2}</p>
        </div>
    )
}


