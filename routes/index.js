// Task Management API Routes

module.exports = function(app) {
  app.get('/', (req, res) => {
    res.send("routing test")
  })
  /**
   * Tasks
   * Create, read, update, and delete tasks
      Filter tasks by status, priority, and other attributes
      Support for pagination to handle large sets of tasks
   */
  /**
   * Create a new task
   * POST /api/tasks
    {
      title: string,
      description: string,
      dueDate: Date,
      priority: 'low' | 'medium' | 'high',
      status: 'todo' | 'in_progress' | 'completed',
      assignedTo: userId,
      projectId?: string
    }
   * */ 
  app.post('/api/tasks', (req, res) => {
    res.send("/api/tasks post");
  })

  /**
   * Get all tasks (with filtering & pagination)
   * GET /api/tasks?status=todo&priority=high&page=1&limit=10
   * */ 
  app.get(`/api/tasks/`, (req, res) => {
    res.send('/api/tasks/ get')
  })

  /**
   * Get a specific task
   * GET /api/tasks/:taskId
   * */ 
  app.get('/api/tasks/:taskId', (req, res)=>{
    res.send('/api/tasks/:taskId get')
  })

  /** 
   * Update a task
   * PUT /api/tasks/:taskId
    {
      title?: string,
      description?: string,
      dueDate?: Date,
      priority?: string,
      status?: string,
      assignedTo?: userId
    }
   * */ 
  app.put('/api/tasks/:taskId', (req, res)=>{
    res.send('/api/tasks/:taskId put')
  })
  
  /** 
   * Delete a task 
   * DELETE /api/tasks/:taskId
   * */ 
  app.delete('/api/tasks/:taskId', (req,res)=> {
    res.send('/api/tasks/:taskId delete')
  })

  /**
   * Projects (for organizing tasks)
   * Organize tasks into projects
     Get all tasks within a project
   * POST /api/projects
    {
      name: string,
      description: string
    }
   */
  app.post('/api/projects', (req, res)=> {
    res.send('/api/projects post')
  })

  // Get all projects
  /**
    GET /api/projects
   */
  app.get('/api/projects', (req, res)=>{
    res.send('/api/projects get')
  })

  // Get tasks in a project
  /**
   * GET /api/projects/:projectId/tasks
   */
  app.get('/api/projects/:projectId/tasks',(req, res)=>{
    res.send('/api/projects/:projectId/tasks get')
  })

  /**
   * Comments on tasks
   * Allow users to comment on tasks
     Retrieve comments for collaboration
   */

  /**
   * Add comment to a task
   * POST /api/tasks/:taskId/comments
    {
      content: string,
      userId: string
    }
   */
  app.post('/api/tasks/:taskId/comments', (req, res)=>{
    res.send('/api/tasks/:taskId/comments post')
  })

  /**
   * Get comments for a task
   * GET /api/tasks/:taskId/comments
   */
  app.get('/api/tasks/:taskId/comments',(req, res)=>{
    res.send('/api/tasks/:taskId/comments get')
  })

  /**
   * Task Labels/Tags
   * Add labels to tasks for better organization
Get available labels for categorization
   */
  // Add labels to a task
  /**
   * POST /api/tasks/:taskId/labels
    {
      labels: string[]
    }
   */
  app.post('/api/tasks/:taskId/labels', (req, res)=>{
    res.send('/api/tasks/:taskId/labels post')
  })

  // Get all available labels
  /**
   * GET /api/labels
   */
  app.get('/api/lables', (req,res)=> {
    res.send('/api/lables get')
  })

  /**
   * User Task Management
   * Get tasks assigned to specific users
   * View task statistics per user
   */

  // Get tasks assigned to a user
  /**
   * GET /api/users/:userId/tasks
   */
  app.get('/api/users/:userId/tasks', (req, res)=>{
    res.send('/api/users/:userId/tasks get')
  })

  // Get user's task statistics
  /**
   * GET /api/users/:userId/task-stats
   */
  app.get('/api/users/:userId/task-stats', (req, res)=>{
    res.send('/api/users/:userId/task-stats get')
  })
}
