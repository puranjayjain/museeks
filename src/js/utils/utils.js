/*
|--------------------------------------------------------------------------
| Utils
|--------------------------------------------------------------------------
*/

import path from 'path';



export default {

    /**
     * Parse an int to a more readable string
     *
     * @param int duration
     * @return string
     */
    parseDuration: function (duration) {

        if(duration !== null && duration !== undefined) {

            var hours   = parseInt(duration / 3600);
            var minutes = parseInt(duration / 60) % 60;
            var seconds = parseInt(duration % 60);

            hours = hours < 10 ? '0' + hours : hours;
            var result = hours > 0 ? hours + ':' : '';
                result += (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds  < 10 ? '0' + seconds : seconds);

            return result;

        } else {
            return '00:00';
        }
    },

    /**
     * Format a list of tracks to a nice status
     *
     * @param array tracks
     * @return string
     */
    getStatus: function(tracks) {
        return tracks.length + ' tracks, ' + this.parseDuration(tracks.length === 0 ? 0 : tracks.map(d => d.duration).reduce((a, b) => a + b));
    },

    /**
     * Parse an URI, encoding some caracters
     *
     * @param string uri
     * @return string
     */
    parseURI: function(uri) {
        var root = process.platform === 'win32' ? '' : path.parse(uri).root;
        return 'file://' + root + uri.split(path.sep).map((d, i) => i === 0 ? d : encodeURIComponent(d)).reduce((a, b) => path.join(a, b));
    },

    /**
     * Sort an array of int by ASC or DESC, then remove all duplicates
     *
     * @param array  array of int to be sorted
     * @param string 'asc' or 'desc' depending of the sort needed
     * @return array
     */
    simpleSort: function(array, sorting) {

        if(sorting == 'asc') {
            array.sort(function(a, b) {
                return a - b;
            });
        }
        else if (sorting == 'desc') {
            array.sort(function(a, b) {
                return b - a;
            });
        }

        var result = [];
        array.forEach(function(item) {
            if(result.indexOf(item) < 0) {
                result.push(item);
            }
        });

        return result;
    },

    /**
     * Strip accent from String. From https://jsperf.com/strip-accents
     *
     * @param String str
     * @return String
     */
    stripAccents(str) {

        var accents = "ÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜÝàáâãäåçèéêëìíîïðòóôõöùúûüýÿñ",
            fixes = "aaaaaaceeeeiiiiooooouuuuyaaaaaaceeeeiiiioooooouuuuyyn",
            reg = new RegExp("(" + accents.split("").join("|") + ")", "g");

        function replacement(a){
            return fixes[accents.indexOf(a)] || "";
        }

        return str.replace(reg, replacement).toLowerCase();
    },

    /**
     * Remove duplicates (realpath) and useless children folders
     *
     * @param array the array of folders path
     * @return array
     */
    removeUselessFolders: function(folders) {

        // Remove duplicates
        var filteredFolders = folders.filter((elem, index) => {
            return folders.indexOf(elem) === index;
        });

        var foldersToBeRemoved = [];

        filteredFolders.forEach((folder, i) => {
            filteredFolders.forEach((subfolder, j) => {
                if(subfolder.indexOf(folder) > -1 && i !== j && foldersToBeRemoved.indexOf(folder) === -1) foldersToBeRemoved.push(subfolder);
            });
        });

        filteredFolders = filteredFolders.filter((elem, index) => {
            return foldersToBeRemoved.indexOf(elem) === -1;
        });

        return filteredFolders;
    },

    /**
     * Cut an array in smaller chunks
     *
     * @param array the array to be chunked
     * @param int the length of each chunk
     * @return array
     */
    chunkArray: function(array, chunkLength) {

        var chunks = [];

        for(var i = 0, length = array.length; i < length; i += chunkLength) {
            chunks.push(array.slice(i, i+chunkLength));
        }

        return chunks;
    }
}
