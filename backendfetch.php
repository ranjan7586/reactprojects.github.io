<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js" integrity="sha512-v2CJ7UaYy4JwqLDIrZUI/4hqeoQieOmAZNXBeQyjo21dadnwR+8ZaIJVT8EE2iyI61OV8e6M8PP2/4hpQINQ/g==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <link href='https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/ui-lightness/jquery-ui.css' rel='stylesheet'>
    <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js">
    </script>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <!-- Latest compiled and minified CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- Latest compiled JavaScript -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <!-- <link rel="stylesheet" href="css/resgistration.css"> -->
    <link id="ex_css" rel="stylesheet" href="css/index.css">
    <title>User Details</title>
</head>

<body>
    <div class="main_container">
    </div>
    <div class="dynamic_content"></div>
    <div class="view_sec"></div>
    <div class="result">
        <div class="original_content">
            <div class="heading">
                <h1>User Monitoring Panel</h1>
            </div>
            <div class="search_sec">
                <input type="text" name="search" id="search" placeholder="Type here to search ...">
                <button id="search_btn" class="search_btn btn btn-warning" onclick="handleSearch(1)"><i class="fa-solid fa-magnifying-glass"></i></button>
                <button class="view_all_data btn btn-success" onClick="viewAllRecords(1)">All Records</button>
            </div>
            <div class="filters container">
                <form class="filterform">
                    <label for="fromdate">From</label>
                    <input name="fromdate" id="fromdate" class="date m-2 form-control" placeholder="Select date" style="width:auto;">
                    <label for="todate">To</label>
                    <input name="todate" id="todate" class="date m-2 form-control" placeholder="Select date" style="width:auto;">
                    <select name="filterdate" id="filterdate" class="form-control" style="width:auto;">
                        <option value="" disabled selected>Previous</option>
                        <option value="today">Today</option>
                        <option value="yesterday">Yesterday</option>
                        <option value="last7days">Last 7 days</option>
                        <option value="last15days">Last 15 days</option>
                        <option value="last30days">Last Month</option>
                        <option value="last365days">This Year</option>
                        <option value="lastyear">Last Year</option>
                    </select>
                </form>


            </div>
            <div id="filter_view" class="container"></div>
            <div class="delete_new">
                <div class="delete_all_sec container mb-3 d-flex justify-content-between">
                    <button class="delete_all_btn btn btn-danger" onClick="deleteSelected()">Delete</button>
                    <button class="add_new btn btn-info float-end" onClick="addNewUser()">Add new user</button>
                </div>
            </div>
            <div class="container">
                <table border="1" class="table table-hover">
                    <thead>
                        <tr>
                            <th><input type="checkbox" name="select_all" id="select_all">
                                <label for="select_all"></label>
                            </th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Phone No.</th>
                            <th>Email</th>
                            <th>Image</th>
                            <th>Gender</th>
                            <th>Language Known</th>
                            <th>Country</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody class="dyna_tbody">

                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <div class="page_control">
        <button class="prev_btn m-5 btn btn-warning" onClick="viewPrevious()">Prev</button>
        <button class="next_btn m-5 btn btn-info" onClick="viewNext()">Next</button>
    </div>

</body>
<script id="ex_js" src="js/index.js"></script>

</html>