import List from '../List';

function TestList() {
    const data = [
        { id: 1, name: 'John Doe', email: 'johndoe@example.com' },
        { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' },
        { id: 3, name: 'Peter Smith', email: 'petersmith@example.com' },
    ];
    return (
        <>
            <List title={'Danh sách Sinh viên đã nhận bằng:'} data={data}></List>
        </>
    );
}

export default TestList;
