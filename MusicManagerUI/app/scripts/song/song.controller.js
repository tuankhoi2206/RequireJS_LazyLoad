(function () {
  'use strict';
  angular.module('songApp')
    .controller('SongCtrl', ['$location', 'SongFactory', 'CommonService', 'commonConstant',
      function ($location, SongFactory, CommonService, commonConstant) {

        var vm = this;
        vm.cache = SongFactory.cache;

        function init() {

          vm.common = {
            configBreadcrumb: {titles: ['app.common.home', 'app.common.song']},
            loadingState: true,
            isInputError: false,// used for check input value
            function: {
              checkValueInput: checkValueInput,
              doCancel: doCancel
            }
          };
          /*************** SHOW SONG ***************/
          vm.showSongsView = {
            songs: [],
            searchText: {text: ''},// set the default search/filter
            isCheckedHeaderChkbox: {status: false},
            isDisabledDeleteBtn: {status: true},
            function: {
              isShowMode: isShowMode,
              loadSongs: loadSongs,
              removeSongs: removeSongs,
              switchShowMode: switchShowMode,
              formatData: formatData,
              removeSongById: removeSongById,
              resetCheckBoxSongTable: resetCheckBoxSongTable
            }
          };
          /*************** ADD SONG *****************/
          vm.addSongView = {
            function: {
              isAddMode: isAddMode,
              addSong: addSong,
              switchAddMode: switchAddMode
            }
          };
          /*************** EDIT SONG *****************/
          vm.editSongView = {
            function: {
              isEditMode: isEditMode,
              updateSong: updateSong,
              switchEditMode: switchEditMode
            }
          };

          /*** CONFIG DIRECTIVE TABLE ***/
          vm.configDataSongTable = {
            items: [],
            titleColumns: [],
            rowData: [],
            isCheckedHeaderChkbox: vm.showSongsView.isCheckedHeaderChkbox,
            disableCheckedAll: vm.showSongsView.isDisabledDeleteBtn,
            listCheckedChkBox: vm.cache.showSongsView.listCheckedChkBox, //list checkbox is check
            searchText: '', //vm.showSongsView.searchText,
            multipleSelect: true
          };
          // vm.mainObject = vm.configDataSongTable;
          vm.configDataSongTable.titleColumns.push(
            {//Cols 1
              mapdata: 'id', colname: 'app.table.song.id', width: '8%'
            },
            {//Cols 2
              mapdata: 'title', colname: 'app.table.song.title', width: '30%'
            },
            {//Cols 3
              mapdata: 'artists', colname: 'app.table.song.artist', width: '30%'
            },
            {//Cols 3
              mapdata: '', colname: 'Action', width: '24%'
            }
          );

          vm.configDataSongTable.rowData.push(
            {mapdata: 'id'},
            {mapdata: 'title'},
            {mapdata: 'artists'},
            {mapdata: '', templateUrl: 'scripts/song/template/action-column.html'}
          );

          vm.configFuncSongTable = {
            formatData: vm.showSongsView.function.formatData,
            onDirectToEditPage: vm.editSongView.function.switchEditMode,
            onRemoveItemByIndex: vm.showSongsView.function.removeSongById
          };

          initValuesCurrentView();
        }

        init();

        function initValuesCurrentView() {
          if (vm.cache.currentView.name === commonConstant.VIEW_MODE.SHOW) {
            loadSongs();
          }
        }

        function switchShowMode() {
          vm.cache.currentView = SongFactory.views.table;
          loadSongs();
        }

        function setCheckBoxsModel() {
          var listCheckBoxSong = vm.cache.showSongsView.listCheckedChkBox;
          if (listCheckBoxSong.length > 0) {
            for (var index = vm.showSongsView.songs.length; index--;) {
              var song = vm.showSongsView.songs[index];
              if (listCheckBoxSong.indexOf(song.id) > -1) {
                song.isChecked = true;
              }
            }
            if (listCheckBoxSong.length === vm.showSongsView.songs.length) {
              vm.showSongsView.isCheckedHeaderChkbox.status = true;
            }
            vm.showSongsView.isDisabledDeleteBtn.status = false;
          }
        }

        function resetCheckBoxSongTable() {
          for (var i = 0; i < vm.showSongsView.songs.length; i++) {
            vm.showSongsView.songs[i].isChecked = false;
          }
        }

        function isAddMode() {
          return vm.cache.currentView.name === commonConstant.VIEW_MODE.ADD;
        }

        function isShowMode() {
          return vm.cache.currentView.name === commonConstant.VIEW_MODE.SHOW;
        }

        function isEditMode() {
          return vm.cache.currentView.name === commonConstant.VIEW_MODE.EDIT;
        }

        function loadSongs() {
          CommonService.getData('api/song').then(function (response) {

            vm.showSongsView.songs = response.data;
            vm.configDataSongTable.items = response.data;

            if (isShowMode()) {
              setCheckBoxsModel();
            }
          }, function (error) {
            console.log('error ', error);
          }).finally(function () {
            vm.loadingState = false;
          });
        }

        /*************** ADD SONG *****************/
        function addSong() {
          CommonService.postData('api/song', angular.copy(vm.cache.songModel))
            .then(function () {
              clearSongModel();
              switchShowMode();
              restCaCheModelCreateOrApplyBtn();
            }, function (error) {
              console.log('error ', error);
            }).finally(
            function () {
              vm.loadingState = false;
            }
          );
        }

        function restCaCheModelCreateOrApplyBtn() {
          vm.cache.isDisabledCreateOrApplyBtn.status = true;
        }

        function checkValueInput() {

          if (vm.cache.songModel.title === '' || angular.isUndefined(vm.cache.songModel.title)) {
            vm.common.isInputError = true;
            vm.cache.isDisabledCreateOrApplyBtn.status = true;
          } else {
            vm.common.isInputError = false;
            vm.cache.isDisabledCreateOrApplyBtn.status = false;
          }
          if (vm.cache.currentView.name === commonConstant.VIEW_MODE.EDIT) {
            if ((vm.cache.songModel.title !== vm.cache.currentSong.title &&
              vm.cache.songModel.title.length > 0) ||
              vm.cache.songModel.artists !== vm.cache.currentSong.artists) {
              vm.cache.isDisabledCreateOrApplyBtn.status = false;
            } else {
              vm.cache.isDisabledCreateOrApplyBtn.status = true;
            }
          }
        }

        function switchAddMode() {
          vm.cache.currentView = SongFactory.views.add;
        }

        function doCancel() {
          vm.common.isInputError = false;
          restCaCheModelCreateOrApplyBtn();
          clearSongModel();
          switchShowMode();
        }

        function clearSongModel() {
          vm.cache.songModel = {id: '', title: '', artists: ''};
        }

        /*************** EDIT SONG *****************/
        function switchEditMode(selectedSong) {
          vm.cache.currentSong = selectedSong;
          vm.cache.songModel = angular.copy(selectedSong);
          vm.cache.currentView = SongFactory.views.edit;
        }

        function updateSong() {
          CommonService.putData('api/song', vm.cache.songModel).then(function () {
            clearSongModel();
            switchShowMode();
            restCaCheModelCreateOrApplyBtn();
          }, function (error) {
            console.log('error ', error);
          }).finally(
            function () {
              vm.loadingState = false;
            }
          );
        }

        /*************** REMOVE SONG *****************/
        function removeSongByListID(listCheckedChkBox) {
          var songs = {id: listCheckedChkBox};
          CommonService.deleteData('api/song', angular.copy(songs)).then(function () {
            loadSongs();
          }, function (error) {
            console.log('error ', error);
          }).finally(
            function () {
            }
          );
        }

        /*** checkbox in header table ***/
        function removeSongs() {
          if (vm.showSongsView.isCheckedHeaderChkbox.status) {
            removeSongByListID(angular.copy(vm.cache.showSongsView.listCheckedChkBox));
            vm.showSongsView.isCheckedHeaderChkbox.status = false;//reset checkbox model
            vm.showSongsView.isDisabledDeleteBtn.status = true;//reset
            vm.cache.showSongsView.listCheckedChkBox.length = 0;//rest
          }
          else {
            if (vm.cache.showSongsView.listCheckedChkBox.length === vm.showSongsView.songs.length) {
              vm.showSongsView.isCheckedHeaderChkbox.status = false;
            }
            removeSongByListID(angular.copy(vm.cache.showSongsView.listCheckedChkBox));
            vm.cache.showSongsView.listCheckedChkBox.length = 0;
            vm.showSongsView.isDisabledDeleteBtn.status = true;
          }
          loadSongs();
        }

        function removeSongById(index) {
          var songs = {id: [vm.showSongsView.songs[index].id]};
          CommonService.deleteData('api/song', songs).then(function () {
            loadSongs();
            if (vm.showSongsView.songs.length === 0) {
              vm.showSongsView.isCheckedHeaderChkbox.status = false;
            }
          }, function (error) {
            console.log('error ', error);
          }).finally(
            function () {
            }
          );
        }

        /*format data used for List-view*/
        function formatData(data) {
          return {
            col1: data.id,
            col2: data.title,
            col3: data.artists
          };
        }
      }
    ]);
})
();
