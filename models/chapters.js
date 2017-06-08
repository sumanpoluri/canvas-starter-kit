var chapterList =
      [
        {label: 'Overview', fileName: 'overview'},
        {label: 'The Signed Request', fileName: 'signedRequest'},
        {label: 'OAuth', fileName: 'oAuth'},
        {label: 'Querying Salesforce Data A', fileName: 'queryA'},
        {label: 'Querying Salesforce Data B', fileName: 'queryB'},
        {label: 'Editing Salesforce Data', fileName: 'editing'},
        {label: 'Canvas Events', fileName: 'events'},
        {label: 'Resizing', fileName: 'resizing'},
        {label: 'Lightning', fileName: 'lightning'}
      ];

var chapterForFileName = function (fileName) {
    for (var i=0; i<chapterList.length; i++) {
        if (chapterList[i].fileName === fileName) {
            return chapterList[i];
        }
    }
}

module.exports = exports =
{
    list: chapterList,
    chapterForFileName: chapterForFileName
};
