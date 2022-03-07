
class RequestHelper {


    
	static readPageParameters(req) {

        //Default the paging to page 1, size 10
        var pageParameters = {page:1, pageSize:10};
        if (req.page)
            pageParameters.page = req.page;
        if (req.pagesize)
            pageParameters.pageSize = req.pagesize;


            
		return pageParameters;
	}

	static readFilterParameters(req) {

        let filterParameters = {};
        if (req.class)
            filterParameters.class = req.class;
        if (req.major)
            filterParameters.major = req.major;

		return filterParameters;
	}

    static readSortParameters(req) {

        let sortParameters = {};

        //Sorting is defaulted to true, sort by id ASC.
        sortParameters.sortBy = 'id';
        sortParameters.sortOrder = 'asc';

        if (req.sortby)
            sortParameters.sortBy = req.sortby;
        if (req.sortorder)
            sortParameters.sortOrder = req.sortorder;

        return sortParameters;
	}

}

module.exports = RequestHelper;