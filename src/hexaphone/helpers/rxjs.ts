import { pipe } from "rxjs";
import { filter, scan, skip } from "rxjs/operators";





export function movingWindow(n: number) {
    return pipe(
        scan((acc: any[], item: any) => [item, ...acc.slice(0, n - 1)], []),
        skip(n - 1)
    );
}

//   const input$ = timer(0, 1000).pipe(take(10));  
//   const output$ = input$.pipe(movingWindow(4)).subscribe(o => console.log(o));



function createRandomArray() {
    const arr = [Math.floor(Math.random() * 10)];
    while (Math.random() < 0.5) {
        arr.push(Math.floor(Math.random() * 10));
    }
    return arr;
}

function unique(data: any[]) {
    const u: any[] = [];
    for (const entry of data) {
        if (!u.includes(entry)) {
            u.push(entry);
        }
    }
    return u;
}


export function flattenArraysAndGetUniqueTail(n: number) {
    return pipe(
        scan((aggregated: any[], value: any[]) => {
            aggregated.push(...value);
            const aggregatedUnique = unique(aggregated);
            const l = aggregatedUnique.length;
            if (l < 3) return aggregatedUnique;
            return aggregatedUnique.slice(l - n, l);
        }, [])
    );
}

// const input$ = timer(0, 1000).pipe(
//     map((v) => createRandomArray()),
//     take(5)
// );
// const output$ = input$
//     .pipe(
//         tap((i) => console.log('input: ', i)),
//         flattenArraysAndGetUniqueTail(3)
//     )
//     .subscribe((o) => console.log('output: ', o));


export function getLastNUniqueNotes(n: number) {
    return pipe(
        flattenArraysAndGetUniqueTail(n),
        filter((d: number[]) => d.length === n)
    )
}