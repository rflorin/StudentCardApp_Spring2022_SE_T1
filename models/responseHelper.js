
class ResponseHelper {

	static createResponse(totalRecords, sortParameters, pageParameters, filterParameters) {
        //let baseurl = 'http://localhost:3050/api/students?';
        let totalPages = Math.ceil(totalRecords / pageParameters.pageSize);
        
        //let firstPageLink = baseurl + 'page=1&pagesize=' + pageParameters.pageSize;
        //let lastPageLink = baseurl + 'page=' + totalPages + '&pagesize=' + pageParameters.pageSize;
        //let currentPageLink = baseurl + 'page=' + pageParameters.page + '&pagesize=' + pageParameters.pageSize;


        return {data:{},
                pageparameters:{currentpage:pageParameters.page, pagesize:pageParameters.pageSize, totalpages:totalPages, totalrecords:totalRecords, 
                },//currentpagelink:currentPageLink, firstpagelink:firstPageLink, lastpagelink:lastPageLink},
                sortparameters:{sortby:sortParameters.sortBy, sortorder:sortParameters.sortOrder},
                filterparameters:{class:filterParameters.class, major:filterParameters.major}};
	}
}

module.exports = ResponseHelper;