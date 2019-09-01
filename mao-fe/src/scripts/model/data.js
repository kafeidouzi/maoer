class Data {
    get (){
        return fetch('/ppp/mobileWeb/channels?type=2')
        .then(response => response.json())
        .then(result => {
            return result
        })
    }
    get2 (){
        return fetch('/ppp/mobileWeb/catalogrank?cid=46')
        .then(response => response.json())
        .then(result => {
           
            return result
        })
    }
    get3 (){
        return fetch('/ppp/mobileWeb/catalogroot')
        .then(response => response.json())
        .then(result => {
            
            return result
        })
    }
    get4 (){
        return fetch('/api/position/list1')
        .then(response => response.json())
        .then(result => {
            result=result.data.list
            return result
        })
    }
    get5 (){
        return fetch('/ppp/mobileWeb/hotsearch')
        .then(response => response.json())
        .then(result => {
            return result
        })
    }
}

export default new Data()