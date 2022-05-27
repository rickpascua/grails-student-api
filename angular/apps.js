(function () {

    var uId = 0;

    angular.module('studentApp', [])
        .controller('StudentController', ['$scope', '$http', StudentController]);

    function StudentController($scope, $http) {
        $scope.newStudent = null;

        $http({
            method: 'GET',
            url: 'http://localhost:8080/api/student'
        }).then(function success(response) {
            $scope.students = response.data;
        });

        $scope.studentsList = function () {
            $http({
                method: 'GET',
                url: 'http://localhost:8080/api/student'
            }).then(function success(response) {
                $scope.students = response.data;
            });
        }

        $scope.saveStudent = function () {
            console.log('saveStudent');
            if ($scope.newStudent.id == null) {
                $http.post('http://localhost:8080/api/student', $scope.newStudent).then(
                    function successCallBack(response) {
                        console.log('post success');
                        $scope.students = $scope.studentsList();
                    },
                    function errorCallBack(response) {
                        console.log('post error occured');
                    }
                );
            } else {
                $http({
                    method: 'PUT',
                    url: 'http://localhost:8080/api/student/'+$scope.newStudent.id,
                    data: JSON.stringify($scope.newStudent)
                })
                    .then(function (success) {
                        console.log('success');
                        $scope.students = $scope.studentsList();
                    }, function (error) {
                        console.log('errorCallback ' + error.data);
                    });

            }
            $scope.newStudent = null;
        }

        $scope.edit = function (id) {
            for (var i in $scope.students) {
                if ($scope.students[i].id == id) {
                    $scope.newStudent = angular.copy($scope.students[i])
                }
            }
        }

        $scope.delete = function (id) {
            
            $http({
                method: 'DELETE',
                url: 'http://localhost:8080/api/student/'+id
            })
                .then(function (success) {
                    console.log('success');
                    $scope.students = $scope.studentsList();
                }, function (error) {
                    console.log('errorCallback ' + error.data);
                });
        }

    }


})();