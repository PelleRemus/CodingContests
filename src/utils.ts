export function generateLawnFromPath(path: string) {
    let lawn = [[1]];

    let x = 0, y = 0;

    for (let dir of path) {
        switch (dir) {
            case 'D':
                x++;
                if (x >= lawn[0].length) {
                    lawn = lawn.map(row => ([...row, 0]))
                }
                break;
            case 'S': {
                y++;
                if (y >= lawn.length) {
                    lawn.push(new Array(lawn[0].length).fill(0))
                }
                break;
            }
            case 'A':
                x--;
                if (x < 0) {
                    lawn = lawn.map(row => ([0, ...row]))
                    x = 0;
                }
                break;
            case 'W':
                y--;
                if (y < 0) {
                    lawn.unshift(new Array(lawn[0].length).fill(0))
                    y = 0;
                }
                break;
        }
        lawn[y][x]++;
        // console.log(lawn);
    }
    return lawn;
}