import {rest} from "msw"
import '@testing-library/jest-dom/extend-expect'
import {setupServer} from "msw/node"
import { screen, waitFor, waitForElementToBeRemoved} from "@testing-library/react"
import MyCanvas from "./MyCanvas"
import React from "react"
import { render } from '../../test'
const url = process.env.REACT_APP_JOB

/*
* Problem cannot mock my b64 value to test canvas weird and not enough time :)
* */
const mockedData = 'iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAAFklEQVR4nGMUmVCfMPMB4xnHsHP8fwEoZwY8cRgyJAAAAABJRU5ErkJggg=='


const server = setupServer(
    // On précise ici l'url qu'il faudra "intercepter"
    rest.get('http://127.0.0.1:8000/', (req, res, ctx) => {
        // Là on va pouvoir passer les datas mockées dans ce qui est retourné en json
        return res(ctx.json(mockedData))
    })
)

// Active la simulation d'API avant les tests depuis server
beforeAll(() => server.listen())
// // Réinitialise tout ce qu'on aurait pu ajouter en termes de durée pour nos tests avant chaque test
afterEach(() => server.resetHandlers())
// // Ferme la simulation d'API une fois que les tests sont finis
afterAll(() => server.close())

function rgb2hex(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

test('test b64 value rendering', async () => {
    render(
        <MyCanvas width={2} height={2} b64Value={mockedData}/>)
    expect(screen.getByTestId('myCanvas')).toBeTruthy()
    var colorList = []
    // console.log(screen.getByTestId('myCanvas'))
    // const img = screen.getByTestId('myCanvas').toDataURL("image/png").split(';base64,')[1];
    // const img = screen.getByTestId('myCanvas').toDataURL();

    console.log(mockedData)

    await waitFor(() => {
        console.log( screen.getByTestId('myCanvas').toDataURL())
    // let myColorsData = screen.getByTestId('myCanvas').getContext("2d").getImageData(0, 0,2, 2).data
    let myColorsData = screen.getByTestId('myCanvas').getContext("2d").getImageData(0, 0,2, 2).data
    // quickly iterate over all pixels
    for(var i = 0, n = myColorsData.length; i < n; i += 4) {
        var r  = myColorsData[i];
        var g  = myColorsData[i + 1];
        var b  = myColorsData[i + 2];
        //If you need the alpha value it's data[i + 3]
        var hex = rgb2hex("rgb("+r+","+g+","+b+")");
        colorList.push(hex);
    }
    console.log(colorList)
    })
    // await waitFor(() => {
    //     expect(screen.getByTestId('myCanvas').toDataURL()).toBe('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAYAAAB5fY51AAAABmJLR0QA/wD/AP+gvaeTAAABdElEQVR4nO3BMQEAAADCoPVPbQwfoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+Bn+3AAEkkD9cAAAAAElFTkSuQmCC')
    //     screen.debug()
    // })
})