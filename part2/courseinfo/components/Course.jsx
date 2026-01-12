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
    const Content = ({ parts }) => (
        <>
            {parts.map(part => (
                <Part key={part.id} name={part.name} exercises={part.exercises} />
            ))}</>
    )
    // const Total2 = course.parts.reduce((s, p) => s + p.exercises, 0)
    const Total = ({ parts }) => {
        const total = parts.reduce((sum, part) => sum + part.exercises, 0)
        return <p><b>total of {total} exercises</b></p>
    }
    return (
        <div>
            <Header course={course} />
            <Content
                parts={course.parts}
            />
            <Total
                parts={course.parts}
            />
        </div>
    )
}


