import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import GridWrapper from '../../templates/GridWrapper/GridWrapper';
import { TaskInterface } from '../../../types/modelsTypes';
import { AppState } from '../../../reducers/rootReducer';
import { ThunkDispatch } from 'redux-thunk';
import { AppTypes } from '../../../types/actionTypes/appActionTypes';
import { bindActionCreators } from 'redux';
import { getCompanyTasks, selectTask, setTaskInfoOpen } from '../../../actions/taskActions';
import Spinner from '../../atoms/Spinner/Spinner';
import { SpinnerWrapper, List } from '../../../styles/sharedStyles';
import ListBox from '../../molecules/ListBox/ListBox';
import ContentTemplate from '../../templates/ContentTemplate/ContentTemplate';
import gsap from 'gsap';
import TaskInfo from '../TaskInfo/TaskInfo';
import { listAnimation } from '../../../animations/animations';
import DeletePopup from '../../molecules/DeletePopup/DeletePopup';

interface Props {}

type ConnectedProps = Props & LinkStateProps & LinkDispatchProps;

const TaskPageContent: React.FC<ConnectedProps> = ({ isLoading, allCompanyTasks, getCompanyTasks, selectTask, isTaskInfoOpen, setTaskInfoOpen }) => {
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
    <GridWrapper mobilePadding={false} pageName={'Zadania'} setFilterText={setFilterText}>
      {isLoading ? (
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
          </List>
          <ContentTemplate isOpen={isTaskInfoOpen} setOpen={setTaskInfoOpen}>
            <TaskInfo />
          </ContentTemplate>
        </>
      )}
      <DeletePopup isOpen={false} setOpen={() => {}} headerText={'Usuń klienta'} text={'Antoni Krzemiński, Planta'} />
    </GridWrapper>
  );
};

interface LinkStateProps {
  isLoading: boolean;
  allCompanyTasks: TaskInterface[];
  isTaskInfoOpen: boolean;
}

interface LinkDispatchProps {
  getCompanyTasks: () => void;
  selectTask: (task: TaskInterface) => void;
  setTaskInfoOpen: (isOpen: boolean) => void;
}

const mapStateToProps = ({ taskReducer: { isLoading, allCompanyTasks, isTaskInfoOpen } }: AppState): LinkStateProps => {
  return { isLoading, allCompanyTasks, isTaskInfoOpen };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppTypes>): LinkDispatchProps => {
  return {
    getCompanyTasks: bindActionCreators(getCompanyTasks, dispatch),
    selectTask: bindActionCreators(selectTask, dispatch),
    setTaskInfoOpen: bindActionCreators(setTaskInfoOpen, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskPageContent);
