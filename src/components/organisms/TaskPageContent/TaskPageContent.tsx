import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import GridWrapper from '../../templates/GridWrapper/GridWrapper';
import { TaskInterface } from '../../../types/modelsTypes';
import { AppState } from '../../../reducers/rootReducer';
import { ThunkDispatch } from 'redux-thunk';
import { AppTypes } from '../../../types/actionTypes/appActionTypes';
import { bindActionCreators } from 'redux';
import { deleteTask, getCompanyTasks, selectTask, setAddNewTaskOpen, setTaskInfoOpen } from '../../../actions/taskActions';
import Spinner from '../../atoms/Spinner/Spinner';
import { SpinnerWrapper, List, AddIcon, AddParagraph, AddWrapper } from '../../../styles/shared';
import ListBox from '../../molecules/ListBox/ListBox';
import ContentTemplate from '../../templates/ContentTemplate/ContentTemplate';
import gsap from 'gsap';
import TaskInfo from '../TaskInfo/TaskInfo';
import { listAnimation } from '../../../animations/animations';
import DeletePopup from '../../molecules/DeletePopup/DeletePopup';
import AddTaskController from '../../compound/AddTask/AddTaskController';
import { setTaskMapPreviewOpen } from '../../../actions/toggleActions';
import MapCoordsEdit, { CoordsEditType } from '../MapCoordsEdit/MapCoordsEdit';

interface Props {}

type ConnectedProps = Props & LinkStateProps & LinkDispatchProps;

const TaskPageContent: React.FC<ConnectedProps> = ({
  isLoading,
  allCompanyTasks,
  getCompanyTasks,
  selectTask,
  isTaskInfoOpen,
  setTaskInfoOpen,
  setAddNewTaskOpen,
  selectedTask,
  deleteTask,
  isTaskMapPreviewOpen,
  setTaskMapPreviewOpen
}) => {
  const listRef = useRef<HTMLDivElement | null>(null);
  const [filterText, setFilterText] = useState<string>('');
  const [tl] = useState<GSAPTimeline>(gsap.timeline({ defaults: { ease: 'Power3.inOut' } }));

  const filterByTaskName = (filterText: string, allTasks: TaskInterface[]): TaskInterface[] => {
    return allTasks.filter((task) => task.name.toLowerCase().includes(filterText.toLowerCase()));
  };

  useEffect(() => {
    listAnimation(tl, listRef, isLoading);
  }, [isLoading]);

  useEffect(() => {
    getCompanyTasks();
    // allCompanyTasks.length === 0 && getCompanyTasks();
  }, []);

  return (
    <>
      <GridWrapper
        mobilePadding={false}
        pageName={'Zadania'}
        setFilterText={setFilterText}
        render={(isEditToggled, setEditToggled, isDeleteOpen, setDeleteOpen) =>
          isLoading ? (
            <SpinnerWrapper>
              <Spinner />
            </SpinnerWrapper>
          ) : (
            <>
              <List ref={listRef}>
                {filterByTaskName(filterText, allCompanyTasks).map((task) => (
                  <ListBox
                    key={task._id}
                    name={task.name}
                    topDescription={new Date(task.date).toLocaleDateString()}
                    bottomDescription={task.description}
                    isCompanyBox={false}
                    isChecked={task.isCompleted}
                    callback={() => selectTask(task)}
                  />
                ))}
                <AddWrapper onClick={() => setAddNewTaskOpen(true)}>
                  <AddIcon />
                  <AddParagraph>Dodaj zadanie</AddParagraph>
                </AddWrapper>
              </List>
              <ContentTemplate isOpen={isTaskInfoOpen} setOpen={setTaskInfoOpen}>
                <TaskInfo isEditToggled={isEditToggled} setDeleteOpen={setDeleteOpen} setEditToggled={setEditToggled} />
              </ContentTemplate>
              <DeletePopup
                isOpen={isDeleteOpen}
                setOpen={setDeleteOpen}
                headerText={'Usuń zadanie'}
                text={`${selectedTask?.name}`}
                callback={() => selectedTask?._id && deleteTask(selectedTask._id)}
              />
              <AddTaskController />
            </>
          )
        }
      />
      {selectedTask?.clientId && (
        <MapCoordsEdit isOpen={isTaskMapPreviewOpen} setOpen={setTaskMapPreviewOpen} lat={selectedTask?.clientId.lat} long={selectedTask?.clientId.long} type={CoordsEditType.View} />
      )}
    </>
  );
};

interface LinkStateProps {
  isLoading: boolean;
  allCompanyTasks: TaskInterface[];
  isTaskInfoOpen: boolean;
  selectedTask: TaskInterface | null;
  isTaskMapPreviewOpen: boolean;
}

interface LinkDispatchProps {
  getCompanyTasks: () => void;
  selectTask: (task: TaskInterface) => void;
  setTaskInfoOpen: (isOpen: boolean) => void;
  setAddNewTaskOpen: (isOpen: boolean) => void;
  deleteTask: (taskId: string) => void;
  setTaskMapPreviewOpen: (isOpen: boolean) => void;
}

const mapStateToProps = ({ taskReducer: { isLoading, allCompanyTasks, isTaskInfoOpen, selectedTask }, toggleReducer: { isTaskMapPreviewOpen } }: AppState): LinkStateProps => {
  return { isLoading, allCompanyTasks, isTaskInfoOpen, selectedTask, isTaskMapPreviewOpen };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppTypes>): LinkDispatchProps => {
  return {
    getCompanyTasks: bindActionCreators(getCompanyTasks, dispatch),
    selectTask: bindActionCreators(selectTask, dispatch),
    setTaskInfoOpen: bindActionCreators(setTaskInfoOpen, dispatch),
    setAddNewTaskOpen: bindActionCreators(setAddNewTaskOpen, dispatch),
    deleteTask: bindActionCreators(deleteTask, dispatch),
    setTaskMapPreviewOpen: bindActionCreators(setTaskMapPreviewOpen, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskPageContent);
